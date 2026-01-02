import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as stripePayments from "./stripe-payments.ts";
import * as simulation from "./simulation_storage.tsx";
import * as prerelease from "./prerelease.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a6daf7a5/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// SIMULATION ROUTES
// ============================================

// Save simulation completion
app.post("/make-server-a6daf7a5/simulation/complete", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, profile, results, analytics, classId, teacherId, organizationId } = body;
    
    if (!userId || !profile || !results) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const sessionId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const grade = simulation.calculateGrade(results);
    
    const completion: simulation.SimulationCompletion = {
      userId,
      sessionId,
      completedAt: new Date().toISOString(),
      profile,
      results,
      analytics,
      grade,
      classId,
      teacherId,
      organizationId
    };
    
    await simulation.saveSimulationResult(completion);
    
    return c.json({ 
      success: true, 
      data: {
        sessionId,
        grade,
        results
      }
    });
  } catch (error) {
    console.error("Error saving simulation result:", error);
    return c.json({ error: "Failed to save simulation result" }, 500);
  }
});

// Get simulation result
app.get("/make-server-a6daf7a5/simulation/:userId/:sessionId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const sessionId = c.req.param("sessionId");
    
    const result = await simulation.getSimulationResult(userId, sessionId);
    
    if (!result) {
      return c.json({ error: "Simulation not found" }, 404);
    }
    
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching simulation:", error);
    return c.json({ error: "Failed to fetch simulation" }, 500);
  }
});

// Get all simulations for a user
app.get("/make-server-a6daf7a5/simulation/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const simulations = await simulation.getUserSimulations(userId);
    
    return c.json({ success: true, data: simulations });
  } catch (error) {
    console.error("Error fetching user simulations:", error);
    return c.json({ error: "Failed to fetch user simulations" }, 500);
  }
});

// Save progress (for resume later)
app.post("/make-server-a6daf7a5/simulation/progress", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, sessionId, gameState } = body;
    
    if (!userId || !sessionId || !gameState) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    await simulation.saveProgress(userId, sessionId, gameState);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving progress:", error);
    return c.json({ error: "Failed to save progress" }, 500);
  }
});

// Get saved progress
app.get("/make-server-a6daf7a5/simulation/progress/:userId/:sessionId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const sessionId = c.req.param("sessionId");
    
    const progress = await simulation.getProgress(userId, sessionId);
    
    return c.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return c.json({ error: "Failed to fetch progress" }, 500);
  }
});

// Create class (for teachers)
app.post("/make-server-a6daf7a5/simulation/class/create", async (c) => {
  try {
    const body = await c.req.json();
    const { teacherId, className, organizationId } = body;
    
    if (!teacherId || !className) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const classData = await simulation.createClass(teacherId, className, organizationId);
    const classCode = await simulation.generateClassCode(classData.classId);
    
    return c.json({ 
      success: true, 
      data: {
        ...classData,
        classCode
      }
    });
  } catch (error) {
    console.error("Error creating class:", error);
    return c.json({ error: "Failed to create class" }, 500);
  }
});

// Join class with code
app.post("/make-server-a6daf7a5/simulation/class/join", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, classCode } = body;
    
    if (!userId || !classCode) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const classInfo = await simulation.joinClassWithCode(userId, classCode);
    
    return c.json({ success: true, data: classInfo });
  } catch (error) {
    console.error("Error joining class:", error);
    return c.json({ 
      error: error.message || "Failed to join class" 
    }, 400);
  }
});

// Get class results (teacher dashboard)
app.get("/make-server-a6daf7a5/simulation/class/:classId/results", async (c) => {
  try {
    const classId = c.req.param("classId");
    const results = await simulation.getClassResults(classId);
    
    return c.json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching class results:", error);
    return c.json({ error: "Failed to fetch class results" }, 500);
  }
});

// Get teacher's classes
app.get("/make-server-a6daf7a5/simulation/teacher/:teacherId/classes", async (c) => {
  try {
    const teacherId = c.req.param("teacherId");
    const classes = await simulation.getTeacherClasses(teacherId);
    
    return c.json({ success: true, data: classes });
  } catch (error) {
    console.error("Error fetching teacher classes:", error);
    return c.json({ error: "Failed to fetch teacher classes" }, 500);
  }
});

// Get organization analytics
app.get("/make-server-a6daf7a5/simulation/org/:organizationId/analytics", async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const analytics = await simulation.getOrganizationAnalytics(organizationId);
    
    return c.json({ success: true, data: analytics });
  } catch (error) {
    console.error("Error fetching org analytics:", error);
    return c.json({ error: "Failed to fetch organization analytics" }, 500);
  }
});

// Get global statistics (for marketing page)
app.get("/make-server-a6daf7a5/simulation/stats/global", async (c) => {
  try {
    const stats = await simulation.getGlobalStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching global stats:", error);
    return c.json({ error: "Failed to fetch global stats" }, 500);
  }
});

// ============================================
// USER DATA ROUTES
// ============================================

// Get user profile data
app.get("/make-server-a6daf7a5/users/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json({ success: true, data: userData });
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user data" }, 500);
  }
});

// Create or update user profile
app.post("/make-server-a6daf7a5/users/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const userData = await c.req.json();
    
    await kv.set(`user:${userId}`, userData);
    
    return c.json({ success: true, message: "User data saved" });
  } catch (error) {
    console.error("Error saving user:", error);
    return c.json({ error: "Failed to save user data" }, 500);
  }
});

// ============================================
// MARKETPLACE ITEM ROUTES
// ============================================

// Get all marketplace items
app.get("/make-server-a6daf7a5/marketplace/items", async (c) => {
  try {
    const items = await kv.getByPrefix("marketplace:item:");
    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return c.json({ error: "Failed to fetch items" }, 500);
  }
});

// Get single marketplace item
app.get("/make-server-a6daf7a5/marketplace/items/:itemId", async (c) => {
  try {
    const itemId = c.req.param("itemId");
    const item = await kv.get(`marketplace:item:${itemId}`);
    
    if (!item) {
      return c.json({ error: "Item not found" }, 404);
    }
    
    return c.json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching item:", error);
    return c.json({ error: "Failed to fetch item" }, 500);
  }
});

// Create new marketplace item
app.post("/make-server-a6daf7a5/marketplace/items", async (c) => {
  try {
    const itemData = await c.req.json();
    const itemId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const item = {
      ...itemData,
      id: itemId,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    await kv.set(`marketplace:item:${itemId}`, item);
    
    return c.json({ success: true, data: item });
  } catch (error) {
    console.error("Error creating item:", error);
    return c.json({ error: "Failed to create item" }, 500);
  }
});

// Update marketplace item
app.put("/make-server-a6daf7a5/marketplace/items/:itemId", async (c) => {
  try {
    const itemId = c.req.param("itemId");
    const updates = await c.req.json();
    
    const existingItem = await kv.get(`marketplace:item:${itemId}`);
    if (!existingItem) {
      return c.json({ error: "Item not found" }, 404);
    }
    
    const updatedItem = {
      ...existingItem,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`marketplace:item:${itemId}`, updatedItem);
    
    return c.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    return c.json({ error: "Failed to update item" }, 500);
  }
});

// Delete marketplace item
app.delete("/make-server-a6daf7a5/marketplace/items/:itemId", async (c) => {
  try {
    const itemId = c.req.param("itemId");
    await kv.del(`marketplace:item:${itemId}`);
    
    return c.json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return c.json({ error: "Failed to delete item" }, 500);
  }
});

// ============================================
// CLAIMS ROUTES
// ============================================

// Get all claims for a donor's item
app.get("/make-server-a6daf7a5/marketplace/items/:itemId/claims", async (c) => {
  try {
    const itemId = c.req.param("itemId");
    const claims = await kv.getByPrefix(`marketplace:claim:item:${itemId}:`);
    
    return c.json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return c.json({ error: "Failed to fetch claims" }, 500);
  }
});

// Get all claims by a user
app.get("/make-server-a6daf7a5/users/:userId/claims", async (c) => {
  try {
    const userId = c.req.param("userId");
    const claims = await kv.getByPrefix(`marketplace:claim:user:${userId}:`);
    
    return c.json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching user claims:", error);
    return c.json({ error: "Failed to fetch claims" }, 500);
  }
});

// Create a claim on an item
app.post("/make-server-a6daf7a5/marketplace/claims", async (c) => {
  try {
    const claimData = await c.req.json();
    const claimId = `claim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const claim = {
      ...claimData,
      id: claimId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // Store claim with multiple keys for easy lookup
    await kv.mset([
      [`marketplace:claim:${claimId}`, claim],
      [`marketplace:claim:item:${claimData.itemId}:${claimId}`, claim],
      [`marketplace:claim:user:${claimData.userId}:${claimId}`, claim]
    ]);
    
    return c.json({ success: true, data: claim });
  } catch (error) {
    console.error("Error creating claim:", error);
    return c.json({ error: "Failed to create claim" }, 500);
  }
});

// Update claim status (approve/deny)
app.put("/make-server-a6daf7a5/marketplace/claims/:claimId", async (c) => {
  try {
    const claimId = c.req.param("claimId");
    const updates = await c.req.json();
    
    const existingClaim = await kv.get(`marketplace:claim:${claimId}`);
    if (!existingClaim) {
      return c.json({ error: "Claim not found" }, 404);
    }
    
    const updatedClaim = {
      ...existingClaim,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Update all copies of the claim
    await kv.mset([
      [`marketplace:claim:${claimId}`, updatedClaim],
      [`marketplace:claim:item:${existingClaim.itemId}:${claimId}`, updatedClaim],
      [`marketplace:claim:user:${existingClaim.userId}:${claimId}`, updatedClaim]
    ]);
    
    return c.json({ success: true, data: updatedClaim });
  } catch (error) {
    console.error("Error updating claim:", error);
    return c.json({ error: "Failed to update claim" }, 500);
  }
});

// ============================================
// JOB APPLICATION ROUTES
// ============================================

// Get all job applications for an employer
app.get("/make-server-a6daf7a5/employers/:employerId/applications", async (c) => {
  try {
    const employerId = c.req.param("employerId");
    const applications = await kv.getByPrefix(`application:employer:${employerId}:`);
    
    return c.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// Get all applications by a user
app.get("/make-server-a6daf7a5/users/:userId/applications", async (c) => {
  try {
    const userId = c.req.param("userId");
    const applications = await kv.getByPrefix(`application:user:${userId}:`);
    
    return c.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// Create job application
app.post("/make-server-a6daf7a5/applications", async (c) => {
  try {
    const appData = await c.req.json();
    const appId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const application = {
      ...appData,
      id: appId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // Store with multiple keys for easy lookup
    await kv.mset([
      [`application:${appId}`, application],
      [`application:employer:${appData.employerId}:${appId}`, application],
      [`application:user:${appData.userId}:${appId}`, application]
    ]);
    
    return c.json({ success: true, data: application });
  } catch (error) {
    console.error("Error creating application:", error);
    return c.json({ error: "Failed to create application" }, 500);
  }
});

// Update application status
app.put("/make-server-a6daf7a5/applications/:appId", async (c) => {
  try {
    const appId = c.req.param("appId");
    const updates = await c.req.json();
    
    const existingApp = await kv.get(`application:${appId}`);
    if (!existingApp) {
      return c.json({ error: "Application not found" }, 404);
    }
    
    const updatedApp = {
      ...existingApp,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Update all copies
    await kv.mset([
      [`application:${appId}`, updatedApp],
      [`application:employer:${existingApp.employerId}:${appId}`, updatedApp],
      [`application:user:${existingApp.userId}:${appId}`, updatedApp]
    ]);
    
    return c.json({ success: true, data: updatedApp });
  } catch (error) {
    console.error("Error updating application:", error);
    return c.json({ error: "Failed to update application" }, 500);
  }
});

// ============================================
// HOUSING APPLICATION ROUTES
// ============================================

// Create housing application (FastTrack)
app.post("/make-server-a6daf7a5/housing/applications", async (c) => {
  try {
    const appData = await c.req.json();
    const appId = `housing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const application = {
      ...appData,
      id: appId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await kv.mset([
      [`housing:application:${appId}`, application],
      [`housing:application:property:${appData.propertyId}:${appId}`, application],
      [`housing:application:user:${appData.userId}:${appId}`, application]
    ]);
    
    return c.json({ success: true, data: application });
  } catch (error) {
    console.error("Error creating housing application:", error);
    return c.json({ error: "Failed to create housing application" }, 500);
  }
});

// Get housing applications for property owner
app.get("/make-server-a6daf7a5/properties/:propertyId/applications", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const applications = await kv.getByPrefix(`housing:application:property:${propertyId}:`);
    
    return c.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching housing applications:", error);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// ============================================
// STRIPE PAYMENT ROUTES
// ============================================

// Create subscription checkout session
app.post("/make-server-a6daf7a5/stripe/checkout/subscription", async (c) => {
  try {
    const { userId, tier, successUrl, cancelUrl } = await c.req.json();
    
    if (!userId || !tier) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const session = await stripePayments.createSubscriptionCheckout(
      userId,
      tier,
      successUrl,
      cancelUrl
    );

    return c.json({ success: true, data: session });
  } catch (error: any) {
    console.error("Error creating subscription checkout:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Create FastTrack payment session
app.post("/make-server-a6daf7a5/stripe/checkout/fasttrack", async (c) => {
  try {
    const { userId, propertyId, tier, successUrl, cancelUrl } = await c.req.json();
    
    if (!userId || !propertyId || !tier) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const session = await stripePayments.createFastTrackPayment(
      userId,
      propertyId,
      tier,
      successUrl,
      cancelUrl
    );

    return c.json({ success: true, data: session });
  } catch (error: any) {
    console.error("Error creating FastTrack payment:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Create customer portal session
app.post("/make-server-a6daf7a5/stripe/portal", async (c) => {
  try {
    const { customerId, returnUrl } = await c.req.json();
    
    if (!customerId) {
      return c.json({ error: "Missing customer ID" }, 400);
    }

    const portal = await stripePayments.createPortalSession(customerId, returnUrl);

    return c.json({ success: true, data: portal });
  } catch (error: any) {
    console.error("Error creating portal session:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Cancel subscription
app.post("/make-server-a6daf7a5/stripe/subscription/cancel", async (c) => {
  try {
    const { subscriptionId } = await c.req.json();
    
    if (!subscriptionId) {
      return c.json({ error: "Missing subscription ID" }, 400);
    }

    await stripePayments.cancelSubscription(subscriptionId);

    return c.json({ success: true, message: "Subscription cancelled" });
  } catch (error: any) {
    console.error("Error cancelling subscription:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Stripe webhook endpoint
app.post("/make-server-a6daf7a5/stripe/webhook", async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    const body = await c.req.text();
    
    if (!signature) {
      return c.json({ error: "Missing signature" }, 400);
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
    const event = await stripePayments.verifyWebhook(body, signature, webhookSecret);

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
        const createdSub = await stripePayments.handleSubscriptionCreated(
          event.data.object as any
        );
        // Save to database
        await kv.set(`subscription:${createdSub.subscriptionId}`, createdSub);
        await kv.set(`user:${createdSub.userId}:subscription`, createdSub);
        break;

      case 'customer.subscription.updated':
        const updatedSub = await stripePayments.handleSubscriptionUpdated(
          event.data.object as any
        );
        await kv.set(`subscription:${updatedSub.subscriptionId}`, updatedSub);
        break;

      case 'customer.subscription.deleted':
        const deletedSub = await stripePayments.handleSubscriptionDeleted(
          event.data.object as any
        );
        await kv.del(`user:${deletedSub.userId}:subscription`);
        break;

      case 'payment_intent.succeeded':
        const payment = await stripePayments.handlePaymentSucceeded(
          event.data.object as any
        );
        await kv.set(`payment:${payment.paymentId}`, payment);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return c.json({ success: true, received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// TAX RECEIPT ROUTES
// ============================================

// Generate tax receipt for donation
app.post("/make-server-a6daf7a5/tax-receipts", async (c) => {
  try {
    const receiptData = await c.req.json();
    const receiptNumber = `FAF-2024-${String(Date.now()).slice(-6)}`;
    const receiptId = `receipt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const receipt = {
      ...receiptData,
      id: receiptId,
      receiptNumber,
      createdAt: new Date().toISOString(),
      taxYear: new Date().getFullYear()
    };
    
    await kv.mset([
      [`tax-receipt:${receiptId}`, receipt],
      [`tax-receipt:donor:${receiptData.donorId}:${receiptId}`, receipt]
    ]);
    
    return c.json({ success: true, data: receipt });
  } catch (error) {
    console.error("Error creating tax receipt:", error);
    return c.json({ error: "Failed to create tax receipt" }, 500);
  }
});

// Get donor's tax receipts
app.get("/make-server-a6daf7a5/donors/:donorId/receipts", async (c) => {
  try {
    const donorId = c.req.param("donorId");
    const receipts = await kv.getByPrefix(`tax-receipt:donor:${donorId}:`);
    
    return c.json({ success: true, data: receipts });
  } catch (error) {
    console.error("Error fetching tax receipts:", error);
    return c.json({ error: "Failed to fetch receipts" }, 500);
  }
});

// ============================================
// PRERELEASE APP ROUTES
// ============================================

// Sync prerelease data from prison tablets
app.post("/make-server-a6daf7a5/prerelease/sync", async (c) => {
  try {
    const data = await c.req.json();
    
    if (!data.facility || !data.facilityCode) {
      return c.json({ error: "Missing facility information" }, 400);
    }
    
    const results = await prerelease.syncPrereleaseData(data);
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    console.error("Error syncing prerelease data:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Manual import from prison staff upload
app.post("/make-server-a6daf7a5/prerelease/import", async (c) => {
  try {
    const { encryptedData, facilityCode } = await c.req.json();
    
    if (!encryptedData || !facilityCode) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    // In production, decrypt the data here
    // For now, assume it's already decrypted
    const data = JSON.parse(encryptedData);
    
    const results = await prerelease.syncPrereleaseData({
      ...data,
      facilityCode,
      syncTimestamp: Date.now()
    });
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    console.error("Error importing prerelease data:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Claim account after release
app.post("/make-server-a6daf7a5/prerelease/claim", async (c) => {
  try {
    const { releaseCode, phoneNumber, email } = await c.req.json();
    
    if (!releaseCode || !phoneNumber) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const user = await prerelease.claimAccount(releaseCode, phoneNumber, email);
    
    return c.json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error claiming account:", error);
    return c.json({ error: error.message }, 400);
  }
});

// Search candidates (for employer portal)
app.get("/make-server-a6daf7a5/prerelease/candidates", async (c) => {
  try {
    const location = c.req.query("location");
    const skills = c.req.query("skills");
    const certs = c.req.query("certifications");
    const releaseDateStart = c.req.query("releaseDateStart");
    const releaseDateEnd = c.req.query("releaseDateEnd");
    
    const filters = {
      location,
      skills: skills ? skills.split(",") : undefined,
      certifications: certs ? certs.split(",") : undefined,
      releaseDateStart,
      releaseDateEnd
    };
    
    const candidates = await prerelease.searchCandidates(filters);
    
    return c.json({ success: true, data: candidates });
  } catch (error: any) {
    console.error("Error searching candidates:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get single candidate details
app.get("/make-server-a6daf7a5/prerelease/candidates/:candidateId", async (c) => {
  try {
    const candidateId = c.req.param("candidateId");
    
    const user = await kv.get(`prerelease:user:id:${candidateId}`);
    if (!user) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    
    const resume = await kv.get(`prerelease:user:${candidateId}:resume`);
    const habits = await kv.getByPrefix(`prerelease:user:${candidateId}:habit:`);
    const certs = await kv.getByPrefix(`prerelease:user:${candidateId}:cert:`);
    const goals = await kv.getByPrefix(`prerelease:user:${candidateId}:goal:`);
    const checkins = await kv.getByPrefix(`prerelease:user:${candidateId}:checkin:`);
    
    return c.json({
      success: true,
      data: {
        user,
        resume,
        habits,
        certifications: certs,
        goals,
        checkIns: checkins
      }
    });
  } catch (error: any) {
    console.error("Error fetching candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Create job offer
app.post("/make-server-a6daf7a5/prerelease/offers", async (c) => {
  try {
    const offerData = await c.req.json();
    
    if (!offerData.employerId || !offerData.prereleaseUserId || !offerData.jobTitle) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const offer = await prerelease.createJobOffer(offerData);
    
    return c.json({ success: true, data: offer });
  } catch (error: any) {
    console.error("Error creating offer:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get employer's offers
app.get("/make-server-a6daf7a5/prerelease/employers/:employerId/offers", async (c) => {
  try {
    const employerId = c.req.param("employerId");
    const offers = await prerelease.getEmployerOffers(employerId);
    
    return c.json({ success: true, data: offers });
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Update offer status
app.put("/make-server-a6daf7a5/prerelease/offers/:offerId", async (c) => {
  try {
    const offerId = c.req.param("offerId");
    const updates = await c.req.json();
    
    const offer = await prerelease.updateJobOffer(offerId, updates);
    
    return c.json({ success: true, data: offer });
  } catch (error: any) {
    console.error("Error updating offer:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Initiate WOTC process
app.post("/make-server-a6daf7a5/prerelease/wotc", async (c) => {
  try {
    const wotcData = await c.req.json();
    
    if (!wotcData.employerId || !wotcData.prereleaseUserId || !wotcData.hireId) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const wotc = await prerelease.initiateWOTC(wotcData);
    
    return c.json({ success: true, data: wotc });
  } catch (error: any) {
    console.error("Error initiating WOTC:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Update WOTC status
app.put("/make-server-a6daf7a5/prerelease/wotc/:wotcId", async (c) => {
  try {
    const wotcId = c.req.param("wotcId");
    const updates = await c.req.json();
    
    const wotc = await prerelease.updateWOTC(wotcId, updates);
    
    return c.json({ success: true, data: wotc });
  } catch (error: any) {
    console.error("Error updating WOTC:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get admin analytics
app.get("/make-server-a6daf7a5/prerelease/admin/analytics", async (c) => {
  try {
    const analytics = await prerelease.getAdminAnalytics();
    
    return c.json({ success: true, data: analytics });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get system health
app.get("/make-server-a6daf7a5/prerelease/admin/health", async (c) => {
  try {
    const health = await prerelease.getSystemHealth();
    
    return c.json({ success: true, data: health });
  } catch (error: any) {
    console.error("Error fetching system health:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);
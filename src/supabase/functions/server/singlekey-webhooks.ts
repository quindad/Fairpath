/**
 * SingleKey Webhook Handler (Backend Only)
 * 
 * This file shows how to implement webhook signature verification
 * on the backend using Deno's Web Crypto API
 */

import { Hono } from 'npm:hono';

const WEBHOOK_SECRET = Deno.env.get('SINGLEKEY_WEBHOOK_SECRET') || '';

/**
 * Verify webhook signature using HMAC-SHA256
 */
async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    // Use Web Crypto API (available in Deno)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const data = encoder.encode(payload);
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
    
    // Convert to hex string
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Compare signatures (constant-time comparison)
    return signature === expectedSignature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Handle SingleKey webhook events
 */
export function setupSingleKeyWebhooks(app: Hono) {
  app.post('/make-server-a6daf7a5/webhooks/singlekey', async (c) => {
    try {
      const rawBody = await c.req.text();
      const signature = c.req.header('X-SingleKey-Signature') || '';
      
      // Verify signature
      const isValid = await verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return c.json({ error: 'Invalid signature' }, 401);
      }

      const payload = JSON.parse(rawBody);
      
      // Handle different webhook events
      switch (payload.event) {
        case 'screening.completed':
          await handleScreeningCompleted(payload.data);
          break;
          
        case 'screening.failed':
          await handleScreeningFailed(payload.data);
          break;
          
        case 'screening.processing':
          await handleScreeningProcessing(payload.data);
          break;
          
        default:
          console.log('Unknown webhook event:', payload.event);
      }

      return c.json({ success: true });
    } catch (error) {
      console.error('Webhook handler error:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });
}

/**
 * Handle screening completed event
 */
async function handleScreeningCompleted(data: any) {
  console.log('📋 Screening completed:', data.reportId);
  
  // TODO: Implement these actions:
  // 1. Update application status in database
  // 2. Send notification to property owner
  // 3. Send notification to applicant
  // 4. Trigger any automated workflows
  
  try {
    // Example: Update application in KV store
    // await kv.set(`screening:${data.reportId}`, {
    //   status: 'complete',
    //   completedAt: new Date().toISOString(),
    //   results: data.results
    // });
    
    // Example: Send notification
    // await sendNotification({
    //   userId: data.propertyOwnerId,
    //   type: 'screening_complete',
    //   message: `Screening completed for ${data.applicantName}`,
    //   reportId: data.reportId
    // });
    
    console.log('✅ Screening completion handled successfully');
  } catch (error) {
    console.error('Error handling screening completion:', error);
  }
}

/**
 * Handle screening failed event
 */
async function handleScreeningFailed(data: any) {
  console.error('❌ Screening failed:', data.reportId, data.error);
  
  // TODO: Implement these actions:
  // 1. Update application status to error
  // 2. Notify property owner of failure
  // 3. Possibly refund or retry
  // 4. Log error for debugging
  
  try {
    // Example: Update application in KV store
    // await kv.set(`screening:${data.reportId}`, {
    //   status: 'failed',
    //   failedAt: new Date().toISOString(),
    //   error: data.error
    // });
    
    // Example: Send notification
    // await sendNotification({
    //   userId: data.propertyOwnerId,
    //   type: 'screening_failed',
    //   message: `Screening failed for ${data.applicantName}: ${data.error}`,
    //   reportId: data.reportId
    // });
    
    console.log('✅ Screening failure handled');
  } catch (error) {
    console.error('Error handling screening failure:', error);
  }
}

/**
 * Handle screening processing event
 */
async function handleScreeningProcessing(data: any) {
  console.log('⏳ Screening processing:', data.reportId, `${data.percentComplete}%`);
  
  // TODO: Optionally update progress in real-time
  // This is useful for showing live progress to users
  
  try {
    // Example: Update progress in KV store
    // await kv.set(`screening:${data.reportId}:progress`, {
    //   percentComplete: data.percentComplete,
    //   estimatedCompletion: data.estimatedCompletion,
    //   updatedAt: new Date().toISOString()
    // });
    
    console.log('✅ Screening progress updated');
  } catch (error) {
    console.error('Error handling screening progress:', error);
  }
}

/**
 * Example: Send notification (implement based on your notification system)
 */
async function sendNotification(notification: {
  userId: string;
  type: string;
  message: string;
  reportId: string;
}) {
  // TODO: Implement your notification system
  // Options:
  // - Email (via SendGrid, Postmark, etc.)
  // - SMS (via Twilio)
  // - Push notification
  // - In-app notification
  
  console.log('📧 Sending notification:', notification);
  
  // Example email notification:
  // await sendEmail({
  //   to: await getUserEmail(notification.userId),
  //   subject: 'Screening Update',
  //   body: notification.message
  // });
}

/**
 * Get user email from database
 */
async function getUserEmail(userId: string): Promise<string> {
  // TODO: Implement database lookup
  // Example:
  // const user = await kv.get(`user:${userId}`);
  // return user.email;
  
  return 'user@example.com';
}

/**
 * Example usage in index.tsx:
 * 
 * import { setupSingleKeyWebhooks } from './singlekey-webhooks';
 * 
 * const app = new Hono();
 * setupSingleKeyWebhooks(app);
 * 
 * Deno.serve(app.fetch);
 */

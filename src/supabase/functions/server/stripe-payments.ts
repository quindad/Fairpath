/**
 * Stripe Payment Handlers
 * Handles subscriptions, one-time payments, and webhooks
 */

import Stripe from 'npm:stripe@17.4.0';

// Initialize Stripe with secret key from environment
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Create a subscription checkout session
 */
export async function createSubscriptionCheckout(
  userId: string,
  tier: 'plus' | 'pro',
  successUrl: string,
  cancelUrl: string
): Promise<{ sessionId: string; url: string }> {
  try {
    // Price IDs (these would be created in Stripe Dashboard)
    const priceIds = {
      plus: 'price_plus_monthly', // $2/month - create this in Stripe
      pro: 'price_pro_monthly',   // $5/month - create this in Stripe
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIds[tier],
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        userId,
        tier,
        source: 'fairpath_web',
      },
      subscription_data: {
        metadata: {
          userId,
          tier,
        },
      },
    });

    return {
      sessionId: session.id,
      url: session.url!,
    };
  } catch (error: any) {
    console.error('❌ Error creating checkout session:', error);
    throw new Error(`Failed to create checkout: ${error.message}`);
  }
}

/**
 * Create a one-time payment (FastTrack housing application)
 */
export async function createFastTrackPayment(
  userId: string,
  propertyId: string,
  tier: 'free' | 'plus' | 'pro',
  successUrl: string,
  cancelUrl: string
): Promise<{ sessionId: string; url: string }> {
  try {
    // Tier-based pricing
    const prices = {
      free: 7500,  // $75.00
      plus: 7000,  // $70.00
      pro: 6500,   // $65.00
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FastTrack Housing Application',
              description: `Guaranteed 48-hour response for property ${propertyId}`,
            },
            unit_amount: prices[tier],
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        userId,
        propertyId,
        tier,
        type: 'fasttrack',
        source: 'fairpath_web',
      },
    });

    return {
      sessionId: session.id,
      url: session.url!,
    };
  } catch (error: any) {
    console.error('❌ Error creating FastTrack payment:', error);
    throw new Error(`Failed to create payment: ${error.message}`);
  }
}

/**
 * Create customer portal session (for managing subscription)
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<{ url: string }> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('❌ Error creating portal session:', error);
    throw new Error(`Failed to create portal: ${error.message}`);
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  try {
    await stripe.subscriptions.cancel(subscriptionId);
    console.log('✅ Subscription cancelled:', subscriptionId);
  } catch (error: any) {
    console.error('❌ Error cancelling subscription:', error);
    throw new Error(`Failed to cancel subscription: ${error.message}`);
  }
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<any> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error: any) {
    console.error('❌ Error retrieving subscription:', error);
    throw new Error(`Failed to get subscription: ${error.message}`);
  }
}

/**
 * Verify webhook signature and parse event
 */
export async function verifyWebhook(
  payload: string,
  signature: string,
  webhookSecret: string
): Promise<Stripe.Event> {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
    return event;
  } catch (error: any) {
    console.error('❌ Webhook verification failed:', error);
    throw new Error(`Webhook verification failed: ${error.message}`);
  }
}

/**
 * Handle subscription created event
 */
export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('✅ Subscription created:', subscription.id);
  
  const userId = subscription.metadata.userId;
  const tier = subscription.metadata.tier;
  
  return {
    userId,
    tier,
    subscriptionId: subscription.id,
    customerId: subscription.customer as string,
    status: subscription.status,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };
}

/**
 * Handle subscription updated event
 */
export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('✅ Subscription updated:', subscription.id);
  
  return {
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };
}

/**
 * Handle subscription deleted (cancelled) event
 */
export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('✅ Subscription deleted:', subscription.id);
  
  return {
    subscriptionId: subscription.id,
    userId: subscription.metadata.userId,
  };
}

/**
 * Handle successful payment
 */
export async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('✅ Payment succeeded:', paymentIntent.id);
  
  return {
    paymentId: paymentIntent.id,
    amount: paymentIntent.amount / 100, // Convert from cents
    userId: paymentIntent.metadata.userId,
    type: paymentIntent.metadata.type,
  };
}

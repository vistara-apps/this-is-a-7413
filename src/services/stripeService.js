import { apiMethods } from './api.js';

export const stripeService = {
  // Create checkout session for subscription
  createCheckoutSession: async (priceId, successUrl, cancelUrl) => {
    const response = await apiMethods.post('/stripe/create-checkout-session', {
      priceId,
      successUrl: successUrl || `${window.location.origin}/subscription/success`,
      cancelUrl: cancelUrl || `${window.location.origin}/subscription/cancel`
    });
    return response.data;
  },

  // Create customer portal session for subscription management
  createPortalSession: async (returnUrl) => {
    const response = await apiMethods.post('/stripe/create-portal-session', {
      returnUrl: returnUrl || window.location.origin
    });
    return response.data;
  },

  // Get subscription status
  getSubscriptionStatus: async () => {
    const response = await apiMethods.get('/stripe/subscription-status');
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    const response = await apiMethods.post('/stripe/cancel-subscription', {
      subscriptionId
    });
    return response.data;
  },

  // Resume subscription
  resumeSubscription: async (subscriptionId) => {
    const response = await apiMethods.post('/stripe/resume-subscription', {
      subscriptionId
    });
    return response.data;
  },

  // Update payment method
  updatePaymentMethod: async (paymentMethodId) => {
    const response = await apiMethods.post('/stripe/update-payment-method', {
      paymentMethodId
    });
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (limit = 10) => {
    const response = await apiMethods.get(`/stripe/payment-history?limit=${limit}`);
    return response.data;
  },

  // Get upcoming invoice
  getUpcomingInvoice: async () => {
    const response = await apiMethods.get('/stripe/upcoming-invoice');
    return response.data;
  }
};

// Subscription plans configuration
export const subscriptionPlans = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 0.99,
    priceId: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID,
    interval: 'month',
    features: [
      'Basic rights information',
      'Pre-written scripts',
      'Audio recording',
      'Emergency alerts',
      'English only'
    ],
    limitations: [
      'No state-specific content',
      'No AI-generated content',
      'Limited recording storage',
      'No video recording'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    priceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID,
    interval: 'month',
    popular: true,
    features: [
      'Everything in Basic',
      'State-specific legal guides',
      'AI-generated content',
      'Video recording',
      'Unlimited storage',
      'Multiple languages',
      'Priority support',
      'Recent law updates'
    ],
    limitations: []
  }
};

// Utility functions for subscription management
export const subscriptionUtils = {
  // Check if user has active subscription
  hasActiveSubscription: (subscription) => {
    return subscription && 
           subscription.status === 'active' && 
           new Date(subscription.currentPeriodEnd) > new Date();
  },

  // Check if user has premium features
  hasPremiumFeatures: (subscription) => {
    return subscriptionUtils.hasActiveSubscription(subscription) && 
           subscription.planId === 'premium';
  },

  // Check if subscription is in trial
  isInTrial: (subscription) => {
    return subscription && 
           subscription.status === 'trialing' &&
           new Date(subscription.trialEnd) > new Date();
  },

  // Check if subscription is past due
  isPastDue: (subscription) => {
    return subscription && subscription.status === 'past_due';
  },

  // Check if subscription is canceled
  isCanceled: (subscription) => {
    return subscription && subscription.status === 'canceled';
  },

  // Get days until subscription ends
  getDaysUntilEnd: (subscription) => {
    if (!subscription || !subscription.currentPeriodEnd) return 0;
    const endDate = new Date(subscription.currentPeriodEnd);
    const today = new Date();
    const diffTime = endDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Format subscription status for display
  formatStatus: (subscription) => {
    if (!subscription) return 'No subscription';
    
    switch (subscription.status) {
      case 'active':
        return 'Active';
      case 'trialing':
        return 'Trial';
      case 'past_due':
        return 'Past Due';
      case 'canceled':
        return 'Canceled';
      case 'unpaid':
        return 'Unpaid';
      default:
        return subscription.status;
    }
  },

  // Get plan by ID
  getPlanById: (planId) => {
    return subscriptionPlans[planId] || null;
  },

  // Calculate prorated amount for plan change
  calculateProration: (currentPlan, newPlan, daysRemaining, totalDays) => {
    const currentDailyRate = currentPlan.price / totalDays;
    const newDailyRate = newPlan.price / totalDays;
    const refund = currentDailyRate * daysRemaining;
    const newCharge = newDailyRate * daysRemaining;
    return newCharge - refund;
  }
};

// Error handling for Stripe-specific errors
export const handleStripeError = (error) => {
  console.error('Stripe Error:', error);
  
  if (error.data?.stripeError) {
    const stripeError = error.data.stripeError;
    
    switch (stripeError.code) {
      case 'card_declined':
        return 'Your card was declined. Please try a different payment method.';
      case 'expired_card':
        return 'Your card has expired. Please update your payment method.';
      case 'insufficient_funds':
        return 'Insufficient funds. Please try a different payment method.';
      case 'incorrect_cvc':
        return 'Your card\'s security code is incorrect.';
      case 'processing_error':
        return 'An error occurred while processing your payment. Please try again.';
      case 'rate_limit':
        return 'Too many requests. Please wait a moment and try again.';
      default:
        return stripeError.message || 'A payment error occurred. Please try again.';
    }
  }
  
  return error.message || 'A payment error occurred. Please try again.';
};

export default stripeService;

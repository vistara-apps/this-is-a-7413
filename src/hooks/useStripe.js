import { useState, useEffect } from 'react';
import { stripeService, subscriptionUtils, handleStripeError } from '../services/stripeService.js';
import { useUser } from '../contexts/UserContext.jsx';

export const useStripe = () => {
  const { user, updateUser } = useUser();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load subscription data on mount
  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const subscriptionData = await stripeService.getSubscriptionStatus();
      setSubscription(subscriptionData);
      
      // Update user context with subscription tier
      if (subscriptionData) {
        updateUser({ 
          subscriptionTier: subscriptionData.planId || 'free' 
        });
      }
    } catch (err) {
      setError(handleStripeError(err));
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (planId, successUrl, cancelUrl) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await stripeService.createCheckoutSession(
        planId, 
        successUrl, 
        cancelUrl
      );
      
      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      }
      
      return session;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async (returnUrl) => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await stripeService.createPortalSession(returnUrl);
      
      // Redirect to Stripe Customer Portal
      if (session.url) {
        window.location.href = session.url;
      }
      
      return session;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!subscription?.id) {
      throw new Error('No active subscription to cancel');
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await stripeService.cancelSubscription(subscription.id);
      setSubscription(result);
      
      // Update user context
      updateUser({ subscriptionTier: 'free' });
      
      return result;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resumeSubscription = async () => {
    if (!subscription?.id) {
      throw new Error('No subscription to resume');
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await stripeService.resumeSubscription(subscription.id);
      setSubscription(result);
      
      // Update user context
      updateUser({ subscriptionTier: result.planId || 'free' });
      
      return result;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentHistory = async (limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const history = await stripeService.getPaymentHistory(limit);
      return history;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingInvoice = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const invoice = await stripeService.getUpcomingInvoice();
      return invoice;
    } catch (err) {
      const errorMessage = handleStripeError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Computed values
  const hasActiveSubscription = subscriptionUtils.hasActiveSubscription(subscription);
  const hasPremiumFeatures = subscriptionUtils.hasPremiumFeatures(subscription);
  const isInTrial = subscriptionUtils.isInTrial(subscription);
  const isPastDue = subscriptionUtils.isPastDue(subscription);
  const isCanceled = subscriptionUtils.isCanceled(subscription);
  const daysUntilEnd = subscriptionUtils.getDaysUntilEnd(subscription);
  const statusDisplay = subscriptionUtils.formatStatus(subscription);

  return {
    // State
    subscription,
    loading,
    error,
    
    // Actions
    loadSubscription,
    createCheckoutSession,
    openCustomerPortal,
    cancelSubscription,
    resumeSubscription,
    getPaymentHistory,
    getUpcomingInvoice,
    
    // Computed values
    hasActiveSubscription,
    hasPremiumFeatures,
    isInTrial,
    isPastDue,
    isCanceled,
    daysUntilEnd,
    statusDisplay,
    
    // Utilities
    clearError: () => setError(null)
  };
};

export default useStripe;

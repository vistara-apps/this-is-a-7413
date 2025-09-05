import React, { useState } from 'react';
import { Crown, Check, X, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { usePaymentContext } from '../hooks/usePaymentContext';
import Card from './ui/Card';
import Button from './ui/Button';

const Subscription = () => {
  const { user, updateUser } = useUser();
  const { createSession } = usePaymentContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$0.99',
      period: '/month',
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
    {
      id: 'premium',
      name: 'Premium',
      price: '$4.99',
      period: '/month',
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
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: '$49.99',
      period: 'one-time',
      features: [
        'Everything in Premium',
        'Lifetime updates',
        'No recurring fees',
        'Priority feature access',
        'Community forum access'
      ],
      limitations: []
    }
  ];

  const handleSubscribe = async (planId) => {
    if (user.subscriptionTier === planId) {
      alert('You already have this subscription plan.');
      return;
    }

    setIsProcessing(true);
    try {
      await createSession();
      
      // Simulate successful payment
      updateUser({ subscriptionTier: planId });
      alert(`Successfully subscribed to ${plans.find(p => p.id === planId)?.name} plan!`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentPlan = () => {
    return plans.find(plan => plan.id === user.subscriptionTier) || { name: 'Free', price: '$0' };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center text-white mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Protection Level</h2>
        <p className="text-white/80">Get the legal tools and information you need</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-blue-500/20 border-blue-400/30">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="font-semibold text-white">Current Plan</h3>
              <p className="text-white/80">{getCurrentPlan().name} - {getCurrentPlan().price}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular 
                ? 'ring-2 ring-yellow-400/50 bg-gradient-to-b from-yellow-500/10 to-transparent' 
                : ''
            } ${
              user.subscriptionTier === plan.id
                ? 'ring-2 ring-green-400/50 bg-green-500/10'
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            {user.subscriptionTier === plan.id && (
              <div className="absolute -top-3 right-4">
                <span className="bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  CURRENT
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white">
                  {plan.price}
                  <span className="text-sm font-normal text-white/70">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Includes:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-white/60">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                variant={plan.popular ? 'accent' : 'primary'}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isProcessing || user.subscriptionTier === plan.id}
                className="w-full"
              >
                {isProcessing ? (
                  'Processing...'
                ) : user.subscriptionTier === plan.id ? (
                  'Current Plan'
                ) : (
                  `Subscribe to ${plan.name}`
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 text-white">Feature</th>
                  <th className="text-center py-3 text-white">Free</th>
                  <th className="text-center py-3 text-white">Basic</th>
                  <th className="text-center py-3 text-white">Premium</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/10">
                  <td className="py-3 text-white/80">Basic Rights Info</td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-white/80">Audio Recording</td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-white/80">Video Recording</td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-white/80">State-Specific Content</td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-white/80">AI-Generated Content</td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-white/80 text-sm">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Is my payment information secure?</h4>
              <p className="text-white/80 text-sm">
                We use industry-standard encryption and never store your payment information on our servers. All transactions are processed securely.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">What happens to my recordings if I cancel?</h4>
              <p className="text-white/80 text-sm">
                Your recordings remain accessible for 30 days after cancellation. We recommend downloading important files before canceling.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Subscription;
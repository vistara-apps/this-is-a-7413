import React from 'react';
import { Shield, Mic, FileText, MapPin, Crown, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Card from './ui/Card';
import Button from './ui/Button';

const Dashboard = ({ setActiveView }) => {
  const { user } = useUser();

  const quickActions = [
    {
      icon: Mic,
      title: 'Emergency Recording',
      description: 'Start recording immediately',
      action: () => setActiveView('recording'),
      variant: 'primary',
      urgent: true
    },
    {
      icon: FileText,
      title: 'Know Your Rights',
      description: 'Quick reference guide',
      action: () => setActiveView('rights'),
      variant: 'secondary'
    },
    {
      icon: MapPin,
      title: 'State-Specific Info',
      description: 'Laws for your location',
      action: () => setActiveView('state'),
      variant: 'secondary'
    },
    {
      icon: Crown,
      title: 'Upgrade to Premium',
      description: 'Access advanced features',
      action: () => setActiveView('subscription'),
      variant: 'accent'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center text-white mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to Pocket Protector
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Essential legal tools and information at your fingertips. Stay informed, stay protected.
        </p>
      </div>

      {/* Status Banner */}
      {!user.selectedState && (
        <Card className="bg-amber-500/20 border-amber-400/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">Set Your Location</h3>
              <p className="text-sm text-white/80">
                Select your state to get localized legal information
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setActiveView('state')}
            >
              Set State
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                action.urgent ? 'ring-2 ring-red-400/50 bg-red-500/10' : ''
              }`}
              onClick={action.action}
            >
              <div className="text-center p-2">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                  action.urgent 
                    ? 'bg-red-500/20 text-red-400' 
                    : action.variant === 'accent'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                <p className="text-sm text-white/70">{action.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Constitutional Rights
            </h3>
            <p className="text-white/70 text-sm">
              Learn your fundamental rights during police interactions, including the right to remain silent and the right to an attorney.
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Secure Recording
            </h3>
            <p className="text-white/70 text-sm">
              One-tap recording with automatic cloud backup and emergency contact notifications for your safety.
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Local Laws
            </h3>
            <p className="text-white/70 text-sm">
              State-specific legal information tailored to your location, keeping you informed of local variations.
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      {user.subscriptionTier !== 'free' && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/80 text-sm">Rights guide accessed for {user.selectedState || 'your state'}</span>
                <span className="text-white/60 text-xs ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/80 text-sm">Emergency contacts updated</span>
                <span className="text-white/60 text-xs ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
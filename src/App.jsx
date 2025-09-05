import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import KnowYourRights from './components/KnowYourRights';
import RecordingInterface from './components/RecordingInterface';
import StateSelector from './components/StateSelector';
import Subscription from './components/Subscription';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderView = () => {
    switch(activeView) {
      case 'rights':
        return <KnowYourRights />;
      case 'recording':
        return <RecordingInterface />;
      case 'state':
        return <StateSelector />;
      case 'subscription':
        return <Subscription />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
        <Header 
          activeView={activeView} 
          setActiveView={setActiveView}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </main>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="font-bold text-textPrimary">Pocket Protector</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('rights');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Know Your Rights
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('recording');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Record Interaction
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('state');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    State Info
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('subscription');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Subscription
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </UserProvider>
  );
}

export default App;
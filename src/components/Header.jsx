import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = ({ activeView, setActiveView, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">Pocket Protector</h1>
              <p className="text-sm text-white/80 hidden sm:block">Your rights, your voice, instantly accessible</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'dashboard' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('rights')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'rights' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Know Your Rights
              </button>
              <button
                onClick={() => setActiveView('recording')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'recording' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Record
              </button>
              <button
                onClick={() => setActiveView('state')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'state' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                State Info
              </button>
              <button
                onClick={() => setActiveView('subscription')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'subscription' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Subscription
              </button>
            </nav>

            <ConnectButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
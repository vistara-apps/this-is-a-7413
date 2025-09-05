import React, { useState, useEffect } from 'react';
import { MapPin, Search, Check } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Card from './ui/Card';
import Button from './ui/Button';

const StateSelector = () => {
  const { user, updateUser } = useUser();
  const [selectedState, setSelectedState] = useState(user.selectedState || '');
  const [searchTerm, setSearchTerm] = useState('');

  const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'DC', name: 'District of Columbia' }
  ];

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveState = () => {
    updateUser({ selectedState });
    alert('State updated successfully!');
  };

  const getStateInfo = (stateCode) => {
    const stateData = {
      'CA': {
        recording: 'Two-party consent state - both parties must consent to recording private conversations. Public recording of police is generally allowed.',
        stopAndId: 'California has no "stop and identify" law. You are not required to provide ID unless arrested or driving.',
        searchLaws: 'Police need probable cause or consent to search. Vehicle searches have different rules.'
      },
      'NY': {
        recording: 'One-party consent state - you can record conversations you participate in. Public recording of police is allowed.',
        stopAndId: 'No general stop and identify law. ID required only when driving or under arrest.',
        searchLaws: 'Consent or warrant required for searches. Stop and frisk requires reasonable suspicion.'
      },
      'TX': {
        recording: 'One-party consent state. Recording police in public is explicitly protected by state law.',
        stopAndId: 'Stop and identify state - you must provide name if lawfully arrested or detained.',
        searchLaws: 'Consent or warrant required. Vehicle searches allowed with probable cause.'
      },
      'FL': {
        recording: 'Two-party consent state for private conversations. Public recording of police is generally allowed.',
        stopAndId: 'Stop and identify state - must provide name when lawfully detained.',
        searchLaws: 'Consent or warrant required. Enhanced penalties for refusing to ID during detention.'
      }
    };

    return stateData[stateCode] || {
      recording: 'Recording laws vary. Check local regulations for specific requirements.',
      stopAndId: 'Stop and identify laws vary by state. Consult local legal resources.',
      searchLaws: 'Search and seizure protections vary. Know your local laws.'
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center text-white mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">State-Specific Information</h2>
        <p className="text-white/80">Get legal information tailored to your location</p>
      </div>

      {/* Current State Display */}
      {user.selectedState && (
        <Card className="bg-green-500/20 border-green-400/30">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold text-white">Current State</h3>
                <p className="text-white/80">
                  {states.find(s => s.code === user.selectedState)?.name} ({user.selectedState})
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* State Selector */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Your State</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto mb-4">
            {filteredStates.map((state) => (
              <button
                key={state.code}
                onClick={() => setSelectedState(state.code)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedState === state.code
                    ? 'bg-blue-500/30 border border-blue-400 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{state.name}</div>
                    <div className="text-sm opacity-75">{state.code}</div>
                  </div>
                  {selectedState === state.code && (
                    <Check className="w-5 h-5 text-blue-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Save Button */}
          <Button
            variant="primary"
            onClick={handleSaveState}
            disabled={!selectedState || selectedState === user.selectedState}
            className="w-full"
          >
            Save State Selection
          </Button>
        </div>
      </Card>

      {/* State-Specific Legal Info */}
      {selectedState && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Legal Information for {states.find(s => s.code === selectedState)?.name}
          </h3>
          
          {Object.entries(getStateInfo(selectedState)).map(([key, value]) => (
            <Card key={key}>
              <div className="p-4">
                <h4 className="font-semibold text-white mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">{value}</p>
              </div>
            </Card>
          ))}

          {user.subscriptionTier === 'free' && (
            <Card className="bg-amber-500/20 border-amber-400/30">
              <div className="p-4 text-center">
                <h4 className="font-semibold text-white mb-2">Want More Detailed Information?</h4>
                <p className="text-white/80 text-sm mb-4">
                  Upgrade to Premium for comprehensive state-specific guides, recent law changes, and AI-generated content.
                </p>
                <Button variant="accent" size="sm">
                  Upgrade to Premium
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default StateSelector;
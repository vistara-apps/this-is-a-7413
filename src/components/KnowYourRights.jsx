import React, { useState } from 'react';
import { Copy, Volume2, Globe, FileText, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Card from './ui/Card';
import Button from './ui/Button';
import { generateContent } from '../utils/aiService';

const KnowYourRights = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('rights');
  const [selectedLanguage, setSelectedLanguage] = useState(user.preferredLanguage);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'rights', label: 'Your Rights', icon: FileText },
    { id: 'scripts', label: 'Scripts', icon: Volume2 },
    { id: 'procedures', label: 'Procedures', icon: AlertCircle }
  ];

  const basicRights = {
    en: [
      {
        title: "Right to Remain Silent",
        content: "You have the right to remain silent. Anything you say can and will be used against you in a court of law. You can simply say: 'I am exercising my right to remain silent.'"
      },
      {
        title: "Right to an Attorney",
        content: "You have the right to have an attorney present during questioning. If you cannot afford one, one will be appointed for you. Say: 'I want to speak with an attorney.'"
      },
      {
        title: "Right to Refuse Searches",
        content: "You can refuse consent to search your person, car, or home unless they have a warrant. Say: 'I do not consent to any searches.'"
      },
      {
        title: "Right to Record",
        content: "In most states, you have the right to record police interactions in public spaces. Keep your hands visible and announce you are recording."
      }
    ],
    es: [
      {
        title: "Derecho a Permanecer en Silencio",
        content: "Tienes el derecho de permanecer en silencio. Todo lo que digas puede y será usado en tu contra en un tribunal. Puedes simplemente decir: 'Estoy ejerciendo mi derecho a permanecer en silencio.'"
      },
      {
        title: "Derecho a un Abogado",
        content: "Tienes el derecho de tener un abogado presente durante el interrogatorio. Si no puedes pagar uno, se te asignará uno. Di: 'Quiero hablar con un abogado.'"
      },
      {
        title: "Derecho a Rechazar Búsquedas",
        content: "Puedes rechazar el consentimiento para registrar tu persona, auto o casa a menos que tengan una orden. Di: 'No consiento a ningún registro.'"
      },
      {
        title: "Derecho a Grabar",
        content: "En la mayoría de los estados, tienes el derecho de grabar interacciones policiales en espacios públicos. Mantén tus manos visibles y anuncia que estás grabando."
      }
    ]
  };

  const scripts = {
    en: [
      {
        scenario: "Traffic Stop",
        script: "Officer, I understand you've stopped me. I'm going to keep my hands visible. I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?"
      },
      {
        scenario: "Police at Door",
        script: "I'm not opening the door. I do not consent to entry. Please slide your warrant under the door. I am exercising my right to remain silent."
      },
      {
        scenario: "Street Encounter",
        script: "Am I being detained or am I free to go? I am exercising my right to remain silent. I do not consent to any searches."
      }
    ],
    es: [
      {
        scenario: "Parada de Tráfico",
        script: "Oficial, entiendo que me ha detenido. Voy a mantener mis manos visibles. Estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro. ¿Soy libre de irme?"
      },
      {
        scenario: "Policía en la Puerta",
        script: "No voy a abrir la puerta. No consiento a la entrada. Por favor deslice su orden debajo de la puerta. Estoy ejerciendo mi derecho a permanecer en silencio."
      },
      {
        scenario: "Encuentro en la Calle",
        script: "¿Estoy siendo detenido o soy libre de irme? Estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro."
      }
    ]
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleGenerateContent = async () => {
    if (!user.selectedState) {
      alert('Please select your state first to get localized information.');
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateContent(
        `Generate a concise legal rights summary for ${user.selectedState} state, focusing on police interaction rights and procedures. Include key statutes and practical advice. Keep it under 500 words.`,
        user.selectedState
      );
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderRightsContent = () => (
    <div className="space-y-4">
      {basicRights[selectedLanguage]?.map((right, index) => (
        <Card key={index}>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">{right.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{right.content}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyText(right.content)}
                className="ml-2"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {user.subscriptionTier !== 'free' && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">AI-Generated State Guide</h3>
              <Button
                variant="accent"
                size="sm"
                onClick={handleGenerateContent}
                disabled={isGenerating || !user.selectedState}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            {generatedContent && (
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedContent}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );

  const renderScriptsContent = () => (
    <div className="space-y-4">
      {scripts[selectedLanguage]?.map((script, index) => (
        <Card key={index}>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">{script.scenario}</h3>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/90 text-sm leading-relaxed font-mono">
                    "{script.script}"
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyText(script.script)}
                className="ml-2"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderProceduresContent = () => (
    <div className="space-y-4">
      <Card>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2">During a Police Stop</h3>
          <ul className="text-white/80 text-sm space-y-2">
            <li>• Stay calm and keep your hands visible</li>
            <li>• Do not make sudden movements</li>
            <li>• Ask "Am I free to go?" if not under arrest</li>
            <li>• Exercise your right to remain silent</li>
            <li>• Do not resist, even if you believe the stop is unlawful</li>
            <li>• Remember badge numbers and patrol car numbers</li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2">If Arrested</h3>
          <ul className="text-white/80 text-sm space-y-2">
            <li>• Clearly state: "I am exercising my right to remain silent"</li>
            <li>• Ask for a lawyer immediately</li>
            <li>• Do not sign anything without an attorney present</li>
            <li>• Remember: Police can legally lie to you</li>
            <li>• Contact a trusted person as soon as possible</li>
          </ul>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center text-white mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Know Your Rights</h2>
        <p className="text-white/80">Essential information for police interactions</p>
      </div>

      {/* Language Selector */}
      <Card>
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-1 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'rights' && renderRightsContent()}
        {activeTab === 'scripts' && renderScriptsContent()}
        {activeTab === 'procedures' && renderProceduresContent()}
      </div>
    </div>
  );
};

export default KnowYourRights;
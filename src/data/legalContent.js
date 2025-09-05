// Legal content database for Pocket Protector
// This contains state-specific legal information, rights, and scripts

export const legalContent = {
  // Universal rights that apply across all states
  universal: {
    rights: {
      en: {
        title: "Your Constitutional Rights",
        content: [
          {
            title: "Right to Remain Silent",
            description: "You have the right to remain silent. Anything you say can and will be used against you in a court of law.",
            details: "This is your Fifth Amendment right. You can invoke this right at any time during police questioning."
          },
          {
            title: "Right to an Attorney",
            description: "You have the right to an attorney. If you cannot afford an attorney, one will be provided for you.",
            details: "This is your Sixth Amendment right. You can request an attorney at any time during questioning or arrest."
          },
          {
            title: "Right Against Unreasonable Search",
            description: "You have the right to be free from unreasonable searches and seizures.",
            details: "Police generally need a warrant or probable cause to search you, your belongings, or your property."
          },
          {
            title: "Right to Know Why You're Being Stopped",
            description: "You have the right to ask why you are being stopped or detained.",
            details: "Police must have reasonable suspicion of criminal activity to detain you."
          }
        ]
      },
      es: {
        title: "Sus Derechos Constitucionales",
        content: [
          {
            title: "Derecho a Permanecer en Silencio",
            description: "Tiene derecho a permanecer en silencio. Todo lo que diga puede y será usado en su contra en un tribunal.",
            details: "Este es su derecho de la Quinta Enmienda. Puede invocar este derecho en cualquier momento durante el interrogatorio policial."
          },
          {
            title: "Derecho a un Abogado",
            description: "Tiene derecho a un abogado. Si no puede pagar un abogado, se le proporcionará uno.",
            details: "Este es su derecho de la Sexta Enmienda. Puede solicitar un abogado en cualquier momento durante el interrogatorio o arresto."
          },
          {
            title: "Derecho Contra Registros Irrazonables",
            description: "Tiene derecho a estar libre de registros e incautaciones irrazonables.",
            details: "La policía generalmente necesita una orden judicial o causa probable para registrarlo a usted, sus pertenencias o su propiedad."
          },
          {
            title: "Derecho a Saber Por Qué lo Detienen",
            description: "Tiene derecho a preguntar por qué lo están deteniendo.",
            details: "La policía debe tener sospecha razonable de actividad criminal para detenerlo."
          }
        ]
      }
    },
    scripts: {
      en: {
        traffic_stop: {
          title: "Traffic Stop Script",
          content: "Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?"
        },
        arrest: {
          title: "If Being Arrested",
          content: "I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches."
        },
        search_request: {
          title: "Search Request Response",
          content: "I do not consent to any searches. I am exercising my Fourth Amendment rights."
        },
        questioning: {
          title: "Police Questioning",
          content: "I am exercising my right to remain silent. I want to speak to a lawyer before answering any questions."
        }
      },
      es: {
        traffic_stop: {
          title: "Parada de Tráfico",
          content: "Oficial, estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme?"
        },
        arrest: {
          title: "Si Está Siendo Arrestado",
          content: "Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento ningún registro."
        },
        search_request: {
          title: "Respuesta a Solicitud de Registro",
          content: "No consiento ningún registro. Estoy ejerciendo mis derechos de la Cuarta Enmienda."
        },
        questioning: {
          title: "Interrogatorio Policial",
          content: "Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado antes de responder cualquier pregunta."
        }
      }
    }
  },

  // State-specific content (sample for key states)
  states: {
    CA: {
      name: "California",
      rights: {
        en: {
          title: "California-Specific Rights",
          content: [
            {
              title: "Recording Police",
              description: "In California, you have the right to record police officers performing their duties in public.",
              details: "As long as you don't interfere with their work, recording is protected under the First Amendment."
            },
            {
              title: "Immigration Status",
              description: "California is a sanctuary state. Local police cannot detain you solely based on immigration status.",
              details: "Under the California Values Act (SB 54), local law enforcement has limited cooperation with federal immigration enforcement."
            }
          ]
        }
      },
      procedures: {
        en: {
          title: "California Police Procedures",
          content: [
            {
              title: "DUI Checkpoints",
              description: "DUI checkpoints are legal in California but must follow specific procedures.",
              details: "You can turn around before entering a checkpoint if done safely and legally."
            },
            {
              title: "Marijuana Laws",
              description: "Adults 21+ can possess up to 1 ounce of marijuana in California.",
              details: "However, consumption in public places and driving under the influence remain illegal."
            }
          ]
        }
      }
    },
    NY: {
      name: "New York",
      rights: {
        en: {
          title: "New York-Specific Rights",
          content: [
            {
              title: "Stop and Frisk",
              description: "Police can stop and frisk you only with reasonable suspicion of criminal activity.",
              details: "The stop must be brief and the frisk limited to weapons unless other evidence is found."
            },
            {
              title: "Right to Record",
              description: "You have the right to record police interactions in New York.",
              details: "This right is protected as long as you don't interfere with police duties."
            }
          ]
        }
      },
      procedures: {
        en: {
          title: "New York Police Procedures",
          content: [
            {
              title: "Subway Searches",
              description: "Random bag searches are allowed in NYC subway system.",
              details: "You can refuse the search but will be denied entry to the subway system."
            },
            {
              title: "Marijuana Decriminalization",
              description: "Possession of small amounts of marijuana is decriminalized in New York.",
              details: "However, public consumption and driving under the influence remain illegal."
            }
          ]
        }
      }
    },
    TX: {
      name: "Texas",
      rights: {
        en: {
          title: "Texas-Specific Rights",
          content: [
            {
              title: "Identification Requirements",
              description: "Texas has a 'stop and identify' law requiring you to provide your name if lawfully detained.",
              details: "You must provide your name, but you're not required to provide ID unless driving or under arrest."
            },
            {
              title: "Open Carry Laws",
              description: "Texas allows open carry of handguns with proper licensing.",
              details: "You must have a License to Carry (LTC) and follow all applicable laws and restrictions."
            }
          ]
        }
      },
      procedures: {
        en: {
          title: "Texas Police Procedures",
          content: [
            {
              title: "Border Patrol Checkpoints",
              description: "Border Patrol checkpoints are common in South Texas.",
              details: "You have the right to remain silent and refuse searches, but may be detained longer."
            },
            {
              title: "Vehicle Searches",
              description: "Police need probable cause or consent to search your vehicle in Texas.",
              details: "You can refuse consent, but police may search if they have probable cause."
            }
          ]
        }
      }
    },
    FL: {
      name: "Florida",
      rights: {
        en: {
          title: "Florida-Specific Rights",
          content: [
            {
              title: "Stand Your Ground",
              description: "Florida has Stand Your Ground laws for self-defense situations.",
              details: "You have no duty to retreat if you reasonably believe force is necessary to prevent death or great bodily harm."
            },
            {
              title: "Recording Police",
              description: "You have the right to record police officers in Florida.",
              details: "This is protected under the First Amendment as long as you don't interfere with police duties."
            }
          ]
        }
      },
      procedures: {
        en: {
          title: "Florida Police Procedures",
          content: [
            {
              title: "DUI Procedures",
              description: "Florida has implied consent laws for DUI testing.",
              details: "Refusing a breathalyzer test results in automatic license suspension."
            },
            {
              title: "Concealed Carry",
              description: "Florida recognizes concealed carry permits from other states.",
              details: "You must follow all Florida laws regarding where you can and cannot carry."
            }
          ]
        }
      }
    }
  }
};

// Emergency contact templates
export const emergencyTemplates = {
  en: {
    police_interaction: {
      subject: "🚨 Emergency Alert - Police Interaction",
      message: "I am currently in a police interaction at {location}. This is an automated message from Pocket Protector. Please monitor this situation. Time: {timestamp}"
    },
    arrest: {
      subject: "🚨 URGENT - Arrest Alert",
      message: "I have been arrested at {location}. Please contact a lawyer immediately. This is an automated message from Pocket Protector. Time: {timestamp}"
    },
    traffic_stop: {
      subject: "🚨 Alert - Traffic Stop",
      message: "I have been pulled over at {location}. This is an automated message from Pocket Protector. Time: {timestamp}"
    }
  },
  es: {
    police_interaction: {
      subject: "🚨 Alerta de Emergencia - Interacción Policial",
      message: "Actualmente estoy en una interacción policial en {location}. Este es un mensaje automatizado de Pocket Protector. Por favor monitoree esta situación. Hora: {timestamp}"
    },
    arrest: {
      subject: "🚨 URGENTE - Alerta de Arresto",
      message: "He sido arrestado en {location}. Por favor contacte a un abogado inmediatamente. Este es un mensaje automatizado de Pocket Protector. Hora: {timestamp}"
    },
    traffic_stop: {
      subject: "🚨 Alerta - Parada de Tráfico",
      message: "Me han detenido en {location}. Este es un mensaje automatizado de Pocket Protector. Hora: {timestamp}"
    }
  }
};

// Content categories for organization
export const contentCategories = {
  rights: "Constitutional Rights",
  scripts: "Response Scripts",
  procedures: "Police Procedures",
  laws: "State Laws",
  emergency: "Emergency Information"
};

// Content access levels
export const accessLevels = {
  free: ["universal.rights", "universal.scripts.traffic_stop", "universal.scripts.arrest"],
  basic: ["universal.*", "states.*.rights"],
  premium: ["*"] // Access to all content
};

export default legalContent;

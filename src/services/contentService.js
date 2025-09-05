import { apiMethods } from './api.js';
import { legalContent, emergencyTemplates, contentCategories, accessLevels } from '../data/legalContent.js';

export const contentService = {
  // Get content based on user's subscription level and state
  getContent: async (category, state = null, language = 'en') => {
    try {
      // Try to fetch from API first (for dynamic content)
      const response = await apiMethods.get('/content', {
        params: { category, state, language }
      });
      return response.data;
    } catch (error) {
      // Fallback to local content if API is unavailable
      console.warn('API unavailable, using local content:', error.message);
      return getLocalContent(category, state, language);
    }
  },

  // Get rights information
  getRights: async (state = null, language = 'en') => {
    const content = await contentService.getContent('rights', state, language);
    return content;
  },

  // Get response scripts
  getScripts: async (state = null, language = 'en') => {
    const content = await contentService.getContent('scripts', state, language);
    return content;
  },

  // Get state-specific procedures
  getProcedures: async (state, language = 'en') => {
    if (!state) return null;
    const content = await contentService.getContent('procedures', state, language);
    return content;
  },

  // Get emergency templates
  getEmergencyTemplates: (language = 'en') => {
    return emergencyTemplates[language] || emergencyTemplates.en;
  },

  // Search content
  searchContent: async (query, state = null, language = 'en') => {
    try {
      const response = await apiMethods.get('/content/search', {
        params: { query, state, language }
      });
      return response.data;
    } catch (error) {
      // Fallback to local search
      return searchLocalContent(query, state, language);
    }
  },

  // Get AI-generated content (premium feature)
  generateContent: async (prompt, state = null, language = 'en') => {
    const response = await apiMethods.post('/content/generate', {
      prompt,
      state,
      language
    });
    return response.data;
  },

  // Submit content feedback
  submitFeedback: async (contentId, feedback) => {
    const response = await apiMethods.post('/content/feedback', {
      contentId,
      feedback
    });
    return response.data;
  },

  // Get content updates
  getContentUpdates: async (since = null) => {
    const response = await apiMethods.get('/content/updates', {
      params: { since }
    });
    return response.data;
  }
};

// Local content access functions (fallback)
const getLocalContent = (category, state, language) => {
  const userSubscription = getUserSubscriptionLevel();
  
  // Check access permissions
  if (!hasContentAccess(category, state, userSubscription)) {
    throw new Error('Premium subscription required for this content');
  }

  let content = {};

  // Get universal content
  if (legalContent.universal[category]) {
    content.universal = legalContent.universal[category][language] || 
                      legalContent.universal[category].en;
  }

  // Get state-specific content if requested and available
  if (state && legalContent.states[state] && legalContent.states[state][category]) {
    content.state = legalContent.states[state][category][language] || 
                   legalContent.states[state][category].en;
    content.stateName = legalContent.states[state].name;
  }

  return content;
};

// Search local content
const searchLocalContent = (query, state, language) => {
  const results = [];
  const searchTerm = query.toLowerCase();

  // Search universal content
  Object.keys(legalContent.universal).forEach(category => {
    const categoryContent = legalContent.universal[category][language] || 
                           legalContent.universal[category].en;
    
    if (categoryContent.title && categoryContent.title.toLowerCase().includes(searchTerm)) {
      results.push({
        category,
        type: 'universal',
        title: categoryContent.title,
        content: categoryContent
      });
    }

    if (categoryContent.content) {
      categoryContent.content.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)) {
          results.push({
            category,
            type: 'universal',
            title: item.title,
            content: item
          });
        }
      });
    }
  });

  // Search state-specific content if state is provided
  if (state && legalContent.states[state]) {
    Object.keys(legalContent.states[state]).forEach(category => {
      if (category === 'name') return;
      
      const categoryContent = legalContent.states[state][category][language] || 
                             legalContent.states[state][category].en;
      
      if (categoryContent && categoryContent.content) {
        categoryContent.content.forEach(item => {
          if (item.title.toLowerCase().includes(searchTerm) || 
              item.description.toLowerCase().includes(searchTerm)) {
            results.push({
              category,
              type: 'state',
              state,
              stateName: legalContent.states[state].name,
              title: item.title,
              content: item
            });
          }
        });
      }
    });
  }

  return results;
};

// Check if user has access to specific content
const hasContentAccess = (category, state, subscriptionLevel) => {
  const userAccess = accessLevels[subscriptionLevel] || accessLevels.free;
  
  // Check for wildcard access (premium)
  if (userAccess.includes('*')) return true;
  
  // Check specific access patterns
  const contentPath = state ? `states.${state}.${category}` : `universal.${category}`;
  
  return userAccess.some(pattern => {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);
      return contentPath.startsWith(prefix);
    }
    return pattern === contentPath;
  });
};

// Get user subscription level (from localStorage or context)
const getUserSubscriptionLevel = () => {
  try {
    const userData = localStorage.getItem('pocketProtectorUser');
    if (userData) {
      const user = JSON.parse(userData);
      return user.subscriptionTier || 'free';
    }
  } catch (error) {
    console.warn('Could not get user subscription level:', error);
  }
  return 'free';
};

// Content formatting utilities
export const contentUtils = {
  // Format content for display
  formatContent: (content) => {
    if (!content) return null;
    
    return {
      ...content,
      formattedContent: content.content?.map(item => ({
        ...item,
        description: item.description.replace(/\n/g, '<br>'),
        details: item.details?.replace(/\n/g, '<br>')
      }))
    };
  },

  // Get content by access level
  filterContentByAccess: (content, subscriptionLevel) => {
    if (subscriptionLevel === 'premium') return content;
    
    // Filter content based on subscription level
    const allowedCategories = accessLevels[subscriptionLevel] || accessLevels.free;
    
    const filtered = {};
    Object.keys(content).forEach(key => {
      if (allowedCategories.some(pattern => 
        pattern === '*' || 
        pattern.includes(key) || 
        key.includes(pattern.replace('*', ''))
      )) {
        filtered[key] = content[key];
      }
    });
    
    return filtered;
  },

  // Generate shareable content card
  generateShareableCard: (content, state = null) => {
    const stateText = state ? ` (${state})` : '';
    return {
      title: `${content.title}${stateText}`,
      description: content.description || content.content,
      footer: 'Generated by Pocket Protector - Know Your Rights',
      disclaimer: 'This is not legal advice. Consult with an attorney for specific situations.'
    };
  },

  // Validate content structure
  validateContent: (content) => {
    const required = ['title'];
    const missing = required.filter(field => !content[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    return true;
  }
};

export default contentService;

import { apiMethods } from './api.js';

export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await apiMethods.get('/users/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiMethods.patch('/users/me', userData);
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await apiMethods.patch('/users/me/preferences', preferences);
    return response.data;
  },

  // Update selected state
  updateSelectedState: async (state) => {
    const response = await apiMethods.patch('/users/me/state', { selectedState: state });
    return response.data;
  },

  // Manage trusted contacts
  getTrustedContacts: async () => {
    const response = await apiMethods.get('/users/me/contacts');
    return response.data;
  },

  addTrustedContact: async (contact) => {
    const response = await apiMethods.post('/users/me/contacts', contact);
    return response.data;
  },

  updateTrustedContact: async (contactId, contact) => {
    const response = await apiMethods.put(`/users/me/contacts/${contactId}`, contact);
    return response.data;
  },

  removeTrustedContact: async (contactId) => {
    const response = await apiMethods.delete(`/users/me/contacts/${contactId}`);
    return response.data;
  },

  // Subscription management
  getSubscription: async () => {
    const response = await apiMethods.get('/users/me/subscription');
    return response.data;
  },

  updateSubscription: async (subscriptionData) => {
    const response = await apiMethods.patch('/users/me/subscription', subscriptionData);
    return response.data;
  },

  // User activity and analytics
  logActivity: async (activity) => {
    const response = await apiMethods.post('/users/me/activity', activity);
    return response.data;
  },

  getActivityHistory: async (limit = 50, offset = 0) => {
    const response = await apiMethods.get(`/users/me/activity?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  // Account management
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiMethods.post('/users/me/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  deleteAccount: async (password) => {
    const response = await apiMethods.delete('/users/me', {
      data: { password }
    });
    return response.data;
  },

  // Export user data (GDPR compliance)
  exportData: async () => {
    const response = await apiMethods.get('/users/me/export');
    return response.data;
  },

  // Privacy settings
  updatePrivacySettings: async (settings) => {
    const response = await apiMethods.patch('/users/me/privacy', settings);
    return response.data;
  },

  getPrivacySettings: async () => {
    const response = await apiMethods.get('/users/me/privacy');
    return response.data;
  }
};

// User data validation utilities
export const validateUserData = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  phoneNumber: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  state: (state) => {
    const validStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
      'DC'
    ];
    return validStates.includes(state);
  }
};

// User preferences defaults
export const defaultUserPreferences = {
  language: 'en',
  notifications: {
    email: true,
    sms: false,
    push: true
  },
  privacy: {
    shareLocation: false,
    shareActivity: false,
    allowAnalytics: true
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reduceMotion: false
  }
};

export default userService;

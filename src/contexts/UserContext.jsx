import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    email: null,
    phoneNumber: null,
    preferredLanguage: 'en',
    selectedState: null,
    trustedContacts: [],
    subscriptionTier: 'free',
    createdAt: null,
    updatedAt: null,
  });

  const [recordings, setRecordings] = useState([]);
  const [alertLogs, setAlertLogs] = useState([]);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('pocketProtectorUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Auto-detect location for state selection
    if (navigator.geolocation && !user.selectedState) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            if (data.principalSubdivisionCode) {
              const state = data.principalSubdivisionCode.split('-')[1];
              updateUser({ selectedState: state });
            }
          } catch (error) {
            console.log('Could not auto-detect state');
          }
        },
        (error) => {
          console.log('Geolocation not available');
        }
      );
    }
  }, []);

  const updateUser = (updates) => {
    const updatedUser = { 
      ...user, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    setUser(updatedUser);
    localStorage.setItem('pocketProtectorUser', JSON.stringify(updatedUser));
  };

  const addRecording = (recording) => {
    const newRecording = {
      recordingId: crypto.randomUUID(),
      userId: user.userId,
      timestamp: new Date().toISOString(),
      ...recording
    };
    setRecordings(prev => [newRecording, ...prev]);
    return newRecording;
  };

  const addAlertLog = (alertData) => {
    const newAlert = {
      alertId: crypto.randomUUID(),
      userId: user.userId,
      timestamp: new Date().toISOString(),
      ...alertData
    };
    setAlertLogs(prev => [newAlert, ...prev]);
    return newAlert;
  };

  const value = {
    user,
    updateUser,
    recordings,
    addRecording,
    alertLogs,
    addAlertLog,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
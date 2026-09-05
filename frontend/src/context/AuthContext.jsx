import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('swadfit_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-101',
      name: 'Karan Sharma',
      email: 'karan@swadfit.in',
      phone: '+91 98765 43210',
      goal: 'Fat Loss & Lean Muscle',
      targets: { calories: 1800, protein: 140, carbs: 160, fat: 50, fibre: 30 },
      preferences: { diet: 'Both', spice: 'Medium', allergies: [] },
      address: 'Flat 402, Oakwood Heights, Hitec City, Hyderabad - 500081'
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('swadfit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('swadfit_user');
    }
  }, [user]);

  const login = (email, password) => {
    const newUser = {
      id: 'usr-' + Math.floor(Math.random() * 1000),
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+91 98765 43210',
      goal: 'Fat Loss & Lean Muscle',
      targets: { calories: 1800, protein: 140, carbs: 160, fat: 50, fibre: 30 },
      preferences: { diet: 'Both', spice: 'Medium', allergies: [] }
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const signup = (name, email, password, phone) => {
    const newUser = {
      id: 'usr-' + Math.floor(Math.random() * 1000),
      name,
      email,
      phone: phone || '+91 98765 43210',
      goal: 'Maintenance',
      targets: { calories: 2000, protein: 150, carbs: 200, fat: 60, fibre: 30 },
      preferences: { diet: 'Both', spice: 'Medium', allergies: [] }
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateTargets = (newTargets) => {
    setUser(prev => ({
      ...prev,
      targets: { ...prev?.targets, ...newTargets }
    }));
  };

  const updatePreferences = (newPrefs) => {
    setUser(prev => ({
      ...prev,
      preferences: { ...prev?.preferences, ...newPrefs }
    }));
  };

  const updateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateTargets,
      updatePreferences,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

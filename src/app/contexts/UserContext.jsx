import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Demo credentials for different roles
const DEMO_CREDENTIALS = {
  staff: { username: 'staff@lab.com', password: 'staff123' },
  admin: { username: 'admin@lab.com', password: 'admin123' },
  superadmin: { username: 'superadmin@lab.com', password: 'super123' }
};

const UserContext = createContext(undefined);

// Initial users in the system
const initialUsers = [
{
  id: 'user-1',
  name: 'Super Admin',
  email: 'superadmin@lab.com',
  role: 'superadmin',
  createdAt: '2024-01-01'
},
{
  id: 'user-2',
  name: 'John Admin',
  email: 'admin@lab.com',
  role: 'admin',
  createdAt: '2024-01-05'
},
{
  id: 'user-3',
  name: 'Jane Staff',
  email: 'staff@lab.com',
  role: 'staff',
  createdAt: '2024-01-10'
},
{
  id: 'user-4',
  name: 'Mike Technician',
  email: 'mike@lab.com',
  role: 'staff',
  createdAt: '2024-01-15'
}];

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user from localStorage on initial client render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lims_user');
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save user to localStorage when it changes, but only after initialization
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('lims_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('lims_user');
      }
    }
  }, [user, isInitialized]);

const setUserRole = (role) => {
    setUser((prev) => prev ? { ...prev, role } : null);
  };

  const login = (username, password) => {
    // Validate credentials
    const role = Object.entries(DEMO_CREDENTIALS).find(
      ([_, creds]) => creds.username === username && creds.password === password
    )?.[0];

    if (!role) {
      return false; // Invalid credentials
    }

    // Set the authenticated user
    setUser({
      id: 'demo-user',
      name: role === 'staff' ? 'Staff User' : role === 'admin' ? 'Admin User' : 'Super Admin',
      email: `${role}@lab.com`,
      role
    });

    return true; // Successful login
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (newUser) => {
    const user = {
      ...newUser,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAllUsers((prev) => [...prev, user]);
  };

  const deleteUser = (userId) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const updateUserRole = (userId, newRole) => {
    setAllUsers((prev) => prev.map((u) =>
    u.id === userId ? { ...u, role: newRole } : u
    ));
  };

  return (
    <UserContext.Provider value={{
      user,
      setUserRole,
      login,
      logout,
      isAuthenticated: !!user,
      allUsers,
      addUser,
      deleteUser,
      updateUserRole
    }}>
      {children}
    </UserContext.Provider>);
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
// UserContext.js
import { createContext, useState,useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(" ");
  const [adminuser, setAdminuser] = useState({ role: 'admin' });


  return (
    <UserContext.Provider value={{ user, setUser, adminuser, setAdminuser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}


export {UserProvider,useUser, UserContext};

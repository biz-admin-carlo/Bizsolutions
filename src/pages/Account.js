import '../assets/styles/AppLanding.css';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

import LoginInterface from '../components/LoginInterface';
import AccountInfo from '../components/AccountInfo';


export default function Account() {
  const { setUser } = useContext(UserContext);

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem('token'); // Replace 'token' with the actual token key you use
    return token != null;
  };

  // Effect to update user context if needed based on token existence
  useEffect(() => {
    if (isLoggedIn()) {
      // Implement logic to set user details in context
      // It might involve decoding the token or making an API call to get user data
      // setUser(...) 
    }
  }, []); // Empty dependency array means it only runs once on mount

  return (
    isLoggedIn() ? <AccountInfo /> : <LoginInterface />
  );
}

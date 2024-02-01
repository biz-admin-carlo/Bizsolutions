import '../assets/styles/AppLanding.css';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

import NewLoginInterface from '../components/NewLoginInterface';

export default function Login() {
  const { setUser } = useContext(UserContext);

  const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    return token != null;
  };

  useEffect(() => {
    if (isLoggedIn()) {
    }
  }, []);

  return (
    isLoggedIn() ? <Navigate to="/" /> : <NewLoginInterface />
    
  );
}

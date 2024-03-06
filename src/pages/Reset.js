import '../assets/styles/AppLanding.css';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet'; 
import { Navigate } from 'react-router-dom';

import ResetInterface from '../components/Reset_Interface';

export default function Login() {

  const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    return token != null;
  };

  useEffect(() => {
    if (isLoggedIn()) {
    }
  }, []);

  return (
    isLoggedIn() ? <Navigate to="/" /> : 
    <>
      <Helmet>
        <title>BizSolutions | Forgot Password</title>
      </Helmet>
      
      <div data-aos="fade-up"><ResetInterface /></div>
      
    </>
    
  );
}

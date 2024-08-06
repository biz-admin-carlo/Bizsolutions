import { useEffect } from 'react';
import { Helmet } from 'react-helmet'; 
import { Navigate } from 'react-router-dom';
import ResetInterface from '../../components/Biz/Reset_Interface';

import '../../assets/Biz/styles/AppLanding.css';

export default function Login() {

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
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

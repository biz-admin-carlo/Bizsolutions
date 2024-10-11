import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet'; 
import { Navigate } from 'react-router-dom';
import UserContext from '../../../utils/Contexts/userContext';

import LoginUserInterface from '../../../components/Biz/Login/Login';

import '../../../assets/styles/AppLanding.css';

export default function Login() {
  const { setUser } = useContext(UserContext);

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
        <title>BizSolutions | Login</title>
      </Helmet>
      
      <div data-aos="fade-up"><LoginUserInterface /></div>
      
    </>
    
  );
}

import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet'; 
import { Navigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import AdminLogin from '../../components/Biz/Admin_Login';

import '../../assets/Biz/styles/AppLanding.css';

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
      
      <div data-aos="fade-up"><AdminLogin /></div>
      
    </>
    
  );
}

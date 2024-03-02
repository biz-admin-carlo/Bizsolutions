import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import Biz_Register from '../components/Biz_Register.js';


export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');


    if (!token) {
      // console.log('Redirecting to login...'); // Check if this gets logged
      navigate('/login');
    }
  }, [navigate]);

  return (
      <>
        <Helmet>
          <title>BizSolutions | Biz</title>
        </Helmet>

        <Biz_Register />
      </>
  );
}

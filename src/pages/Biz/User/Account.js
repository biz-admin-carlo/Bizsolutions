import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import MainAccount from '../../../components/Biz/Account/MainAccount.js';

export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');


    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
      <>
        <Helmet>
          <title>BizSolutions | Account Details</title>
        </Helmet>

        <MainAccount />
      </>
  );
}

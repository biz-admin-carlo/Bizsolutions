import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

import AccountInfo from '../components/AccountInfo';


export default function Account() {
  const navigate = useNavigate();
  const { user, unsetUser } = useContext(UserContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');


    if (!token) {
      console.log('Redirecting to login...'); // Check if this gets logged
      navigate('/login');
    }
  }, [navigate]);

  return (
      <AccountInfo />
  );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountInfo from '../components/AccountInfo';


export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Redirecting to login...'); // Check if this gets logged
      navigate('/login');
    }
  }, [navigate]);

  return (
      <AccountInfo />
  );
}

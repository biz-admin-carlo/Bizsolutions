import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import SeeBizNes from '../../components/Biz/Admin_SeeBizNes';

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
          <title>BizSolutions | See All Biz</title>
        </Helmet>

        <SeeBizNes />
      </>
  );
}

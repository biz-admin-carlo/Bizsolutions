import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AdminAddBiz from '../../components/Biz/Admin_AddBizNes';

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
          <title>BizSolutions | Add Biz</title>
        </Helmet>

        <AdminAddBiz />
      </>
  );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AddBiznes from '../../../components/Biz/Admin/AddBizness';

export default function CreateBizness() {
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

        <AddBiznes />
      </>
  );
}

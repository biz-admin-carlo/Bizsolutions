import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import UserContext from '../../UserContext';
import SeeBizNes from '../../components/Biz/Admin_SeeBizNes';
import SeeBizNesVendorManager from '../../components/Biz/Admin_SeeBizNessVendorManager';

export default function Account() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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
      
      {
        !(user.isAdmin && user.isVendor) && user.isAdmin && <SeeBizNes />
      }

      {
        user.isAdmin && user.isVendor && <SeeBizNesVendorManager />
      }
    </>
  );
}

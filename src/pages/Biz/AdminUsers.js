import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AdminUsersInfo from '../../components/Biz/Admin_UsersInfo';
import AdminEditProfile from '../../components/Biz/Admin_EditProfile';
import AppFooter from '../../components/Biz/Application_Footer.js';

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
          <title>BizSolutions | Admin Users</title>
        </Helmet>

        <AdminUsersInfo />
        <AdminEditProfile />
        <AppFooter />
      </>
  );
}

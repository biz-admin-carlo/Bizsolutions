import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AdminUsersInfo from '../../../components/Biz/Admin/Admin_UsersInfo.js';
import AdminEditProfile from '../../../components/Biz/Admin/EditProfile.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

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
        <Footer />
      </>
  );
}

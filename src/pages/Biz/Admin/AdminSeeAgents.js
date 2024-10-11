import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AdminUsersInfo from '../../../components/Biz/Admin/Admin_UsersInfo.js';
import AgentsInfo from '../../../components/Biz/Admin/AgentInfo.js'
import AdminEditProfile from '../../../components/Biz/Admin/EditProfile.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

export default function SeeAgents() {
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
          <title>Vendor Manager | See Agents</title>
        </Helmet>

        {/* <AdminUsersInfo /> */}
        <AgentsInfo />
        {/* <AdminEditProfile /> */}
        <Footer />
      </>
  );
}

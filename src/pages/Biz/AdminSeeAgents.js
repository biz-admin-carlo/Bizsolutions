import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AdminUsersInfo from '../../components/Biz/Admin_UsersInfo';
import AgentsInfo from '../../components/Biz/Admin_AgentInfo.js';
import AdminEditProfile from '../../components/Biz/Admin_EditProfile';
import AppFooter from '../../components/Biz/Application_Footer.js';

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
        <AppFooter />
      </>
  );
}

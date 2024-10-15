import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import Dashboard from '../../../components/Biz/Admin/Dashboard.js';
import BarSpinner from '../../../components/Biz/Shared/Spinner/BarSpinner';

import UserContext from '../../../utils/Contexts/userContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Admin() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user.isAdmin) {
      navigate('/account');
    }
  }, [isLoading, user.isAdmin, navigate]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/v1/users/details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        setIsLoading(false);
      } else {

      }
    } catch (error) {
      
    }
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
      <>
        <Helmet>
          <title>BizSolutions | Admin Dashboard</title>
        </Helmet>

        <Dashboard />
      </>
  );
}

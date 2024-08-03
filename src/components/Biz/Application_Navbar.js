import { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import AdminNavbar from './Application_AdminNavbar.js';
import UserNavbar from './Appliaction_UserNavbar.js';

import '../../assets/Biz/styles/AppNavbar.css';
import UserContext from '../../UserContext';
const apiUrl = process.env.REACT_APP_API_URL;

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

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
      }
    } catch (error) {

    }
  };

  // Conditional rendering based on user.isAdmin
  return user && user.isAdmin ? <AdminNavbar /> : <UserNavbar />;
}

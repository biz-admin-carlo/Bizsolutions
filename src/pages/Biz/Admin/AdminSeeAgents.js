import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import { Container } from 'react-bootstrap';
import RetrieveAgents from '../../../components/Biz/Admin/Table/RetrieveAgents';
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
          <title>Vendor Manager | Retrieve Agents</title>
        </Helmet>

        <Container>
          <RetrieveAgents />
        </Container>
        <Footer />
      </>
  );
}

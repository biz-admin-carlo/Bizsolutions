import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AnnuallyPay from '../../components/Biz/Admin_WebDevAnnuallyPay';

export default function PaymentAnnually() {
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
          <title>BizSolutions | Annually Payment</title>
        </Helmet>

        <AnnuallyPay />
      </>
  );
}

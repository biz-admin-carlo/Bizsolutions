import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import MonthlyPay from '../../../components/Biz/Admin/WebDevMonthlyPay';

export default function PaymentMonthly() {
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
          <title>BizSolutions | Monthly Payment</title>
        </Helmet>

        <MonthlyPay />
      </>
  );
}

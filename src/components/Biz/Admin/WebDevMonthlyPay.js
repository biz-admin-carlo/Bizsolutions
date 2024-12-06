import React from 'react';
import { Container } from 'react-bootstrap';
import '../../../assets/styles/AccountInfo.css';

import PaymentLinks from './Table/PaymentLinks.js';

export default function AnnuallyPay() {
  
  return (
    <>
      <Container>
        <div className='text-center py-lg-5'>
            <PaymentLinks />
        </div>
      </Container>
    </>
  );
}

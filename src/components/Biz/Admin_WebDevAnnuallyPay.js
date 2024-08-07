import React from 'react';
import { Container } from 'react-bootstrap';
import AppFooter from './Application_Footer.js';
import '../../assets/Biz/styles/AccountInfo.css';

import BundleStarter from './Pricing_WebDevBundleStarter.js';
import BundleAdvanced from './Pricing_WebDevBundleAdvanced.js';
import BundleExpert from './Pricing_WebDevBundleExpert.js';
import ProfessionalRevamp from './Pricing_WebRevampProfessional.js';
import EnterpriseRevamp from './Pricing_WebRevampEnterprise.js';

export default function AnnuallyPay() {
  
  return (
    <>
      <Container>
        <div className='text-center py-lg-5'>
            <h2>Business Listing & Website Development</h2>
            <h4>Bundle Package</h4>
            <p>Embracing paid annual packages is an invitation to elevate your projects with unwavering support, advanced features, and robust security. These investments empower your production-grade applications, ensuring they thrive with professional reliability, scalability, and peace of mind.</p>
        </div>

            <div className='container'>
                <div className='row justify-content-around'>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleStarter selected={'annual'} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleAdvanced selected={'annual'} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleExpert />
                    </div>

                </div>
            </div>
      </Container>

      <hr />

      <Container>
        <div className='text-center py-lg-5'>
            <h2>Website Revamp</h2>
            <p>Choosing our website revamp service is your step towards transforming your online presence with precision and innovation. Our packages offer continuous, dedicated support, state-of-the-art design updates, and strengthened security measures. This commitment not only revitalizes your website's aesthetics and functionality but also boosts its performance and scalability, providing you with a dependable and compelling digital experience that engages and converts.</p>

        </div>

        <div className='container'>
            <div className='row justify-content-around'>

            <div className='col-sm-12 col-md-6 mb-3'>
                <ProfessionalRevamp selected={'annual'} />
            </div>

            <div className='col-sm-12 col-md-6 mb-3'>
                <EnterpriseRevamp selected={'annual'} />
            </div>
                
            </div>
        </div>

      </Container>
      <AppFooter />
    </>
  );
}

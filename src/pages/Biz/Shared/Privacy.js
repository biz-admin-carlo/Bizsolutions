import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

import '../../../assets/styles/Terms.css';

export default function Privacy() {

  return (
    <>
      <Helmet>
        <title>BizSolutions | Privacy</title>
      </Helmet>

      <div className="app-landing-page">
        <Container className='py-3'>
          <Card className="card-parent mx-lg-5 px-lg-5 py-lg-5 mx-3 mx-md-5 my-md-5 px-md-3 py-md-5 py-3 px-1 text-center text-md-start">
              <Card.Body>
                <div className='py-3 text-center'>
                  <h2>BizSolutions LLC</h2>
                  <Card.Title >Privacy Policy</Card.Title>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>1. Introduction Welcome to Bizsolutions LLC</p> We are committed to protecting the privacy of our clients and website visitors. This Privacy Policy outlines our practices regarding the collection, use, and protection of your Personally Identifiable Information (PII) when you use our services, including business listings, website development, bookkeeping, and outsourcing support.</Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2">
                      <p className="mb-2">2. What Information Do We Collect?</p>
                      For Business Listings and Website Development:
                          <ul>
                              <li>Contact information such as name, email address, mailing address, and phone number.</li>
                              <li>Business information for listings, including business name, address, and services offered.</li>
                              <li>Website development requirements, login credentials, and feedback.</li>
                          </ul>
                      For Bookkeeping and Outsourcing Support:
                          <ul>
                              <li>Detailed financial records and transaction details for bookkeeping services.</li>
                              <li>Business operation information relevant to the outsourcing services provided.</li>
                              <li>Communication logs and project details.</li>
                          </ul>
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>3. How We Use Your Information We use the information we collect to:</p>
                    <ul>
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Improve, personalize, and expand our services.</li>
                        <li>Understand and analyze how you use our services.</li>
                        <li>Develop new products, services, features, and functionality.</li>
                        <li>Communicate with you, directly or through one of our partners, for customer service, updates, and other information related to the service, and for marketing and promotional purposes.</li>
                    </ul>
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>4. How Do We Protect Your Information?</p>
                    <ul>
                        <li>We implement a variety of security measures to maintain the safety of your personal information.</li>
                        <li>Sensitive data, such as credit card numbers, are encrypted and protected with Secure Socket Layer (SSL) technology.</li>
                        <li>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</li>
                    </ul>
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>5. Third-party Disclosure</p>
                    <ul>
                        <li>We do not sell, trade, or rent personally identifiable information (PII) to others.</li>
                        <li>We may share generic aggregated demographic information not linked to any PII regarding visitors and users with our business partners, trusted affiliates, and advertisers.</li>
                    </ul>
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>6. Compliance With U.S. Laws</p>
                    Adherence to federal and state privacy laws, including the California Consumer Privacy Act (CCPA), where applicable. In case of data breaches, compliance with state-specific breach notification laws.
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>7. Children’s Online Privacy Protection Act (COPPA) Compliance
          </p>
                    We do not knowingly collect personal information from children under 13.
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>8. Compliance With Laws</p>
                    We will disclose your personal information where required to do so by law or subpoena.
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>9. Your Data Protection Rights Under General Data Protection Regulation (GDPR)</p>
                    If you are a resident of the European Union, you have certain data protection rights. Bizsolutions LLC aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal information.
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>10. Changes to This Privacy Policy</p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                  </Card.Subtitle>
                </div>

                <div className='mb-4'>
                  <Card.Subtitle className="mb-2"><p>11. Contact Us</p>
                  If you have any questions about this Privacy Policy, please contact us by email at [Your Email Address].
                  </Card.Subtitle>
                </div>

              </Card.Body>
          </Card>
        </Container>
      </div>

  <Footer />
  </>
  );
}

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/AppInformation.css';

export default function Pricing() {
    const [selected, setSelected] = useState('annual');

    const handleSelect = (button) => {
      console.log("Previous selected state:", selected);
      console.log("New button selected:", button);
      setSelected(button);
  };
    return (
        <div className='app-landing-page'>
            <Container>
                <Row className="py-4 w-100">
                  <Col lg={8} md={6} sm={12}>
                    <div>
                        <h1 className='pt-lg-4'>BizSolutions is the Perfect Plan For You</h1>
                        <p className="pt-2">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={12}>
                    <div className="container mt-lg-5">
                        <div className="custom-btn custom-btn-light">
                          <button
                              className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                              onClick={() => handleSelect('annual')}
                          >
                              Annually<span className='lower-case ms-1'>Save up to 35%</span>
                          </button>
                          <button
                              className={`custom-btn ${selected === 'monthly' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                              onClick={() => handleSelect('monthly')}
                          >
                              Monthly
                          </button>
                        </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  
                </Row>
            </Container>
        </div>
    );
}

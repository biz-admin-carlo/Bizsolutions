import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/AppPreFooter.css';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaTwitter } from "react-icons/fa";

export default function AppPreFooter() {
  return (
    <Container fluid className="py-5 app-pre-footer">
      <Container>
        <Row className="align-items-start">
          <Col xs={12} md={3} className="mb-3">
            <Link to="/contact-us" className="footer-link"><h6>Contact Us</h6></Link>
            <Link to="/about-us" className="footer-link"><h6>About Us</h6></Link>
            <Link to="/careers" className="footer-link"><h6>Careers</h6></Link>

            <div className='social-media-icons mt-3 d-none d-md-block'>
              {/* Social Media Icons */}
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaTiktok />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaYoutube />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaTwitter />
                </a>
                                
            </div>

          </Col>
          <Col xs={12} md={4} className="mb-3">
            <Link to="/terms" className="footer-link"><h6>Terms of Service</h6></Link>
            <Link to="/privacy" className="footer-link"><h6>Privacy Policy</h6></Link>
          </Col>
          <Col xs={12} md={4} className="newsletter-col">

            <Form>
              <h6>Subscribe to our newsletter</h6>
              <Form.Control type="text" placeholder="name@domain.com" />
              <Button variant="outline-secondary" className='my-2 ms-auto'>Submit</Button>
            </Form>

          </Col>

          <div className='social-media-icons mt-3 d-sm-block d-md-none'>
              {/* Social Media Icons */}
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaTiktok />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="me-2 text-decoration-none">
                  <FaYoutube />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaTwitter />
                </a>
                                
            </div>
        </Row>
      </Container>
    </Container>
  );
};
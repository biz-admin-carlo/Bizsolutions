import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiCopyLight } from 'react-icons/pi';
import { Container, Form, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/NewLoginInterface.css';
import BarSpinner from './Reusable_BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

const ReferralCode = ({ user }) => {
  const [showCopyAlert, setShowCopyAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [referralToken, setReferralToken] = useState(sessionStorage.getItem('referralToken') || user.referralCode);
  const [referralLink, setReferralLink] = useState(sessionStorage.getItem('referralLink') || user.referralLink);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('referralToken');
    if (storedToken) {
      setReferralToken(storedToken);
    }
  }, []);

  const handleCopyTokenToClipboard = () => {
    navigator.clipboard.writeText(referralToken).then(() => {
      setShowCopyAlert('token');
      setTimeout(() => setShowCopyAlert(''), 3000);
    });
  };

  const handleCopyLinkToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setShowCopyAlert('link');
      setTimeout(() => setShowCopyAlert(''), 3000);
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const getReferralCode = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/v1/users/${user._id}/referral-code`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem('referralToken', response.data.referralCode);
      setReferralToken(response.data.referralCode);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error fetching referral code:', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const getReferralLink = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/v1/users/${user._id}/referral-link`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem('referralLink', response.data.referralLink);
      setReferralLink(response.data.referralLink);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error fetching referral link:', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <BarSpinner />;
  }

  const referralTokenDisplay = referralToken && (
    <Form.Group className="mb-3" controlId="formBasicReferralToken">
      <Form.Label>Your Referral Token</Form.Label>
      <div className="d-flex">
        <Form.Control readOnly placeholder="Referral Token Here" value={referralToken} />
        <Button variant="outline-secondary" onClick={handleCopyTokenToClipboard} className="ml-2">
          <PiCopyLight />
        </Button>
      </div>
    </Form.Group>
  );

  const referralLinkDisplay = referralLink && (
    <>
    <Form.Group className="mb-3" controlId="formBasicReferralLink">
      <Form.Label>Your Referral Link</Form.Label>
      <div className="d-flex">
        <Form.Control readOnly placeholder="Referral Link Here" value={referralLink} />
        <Button variant="outline-secondary" onClick={handleCopyLinkToClipboard} className="ml-2">
          <PiCopyLight />
        </Button>
      </div>
    </Form.Group>
      <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
        Welcome to <span className='biz-color'>BizSolutions</span>! Get started with our Referral System by simply copying your unique referral token or link. Share it with friends, colleagues, and peers to invite them to join the BizSolutions community. Want to know more? Discover all the benefits of our referral system <span className="dotted-underline" onClick={() => navigate('/biz-referral-system')}>here</span>. 
      </p>
    </>
  );

  return (
    <Container style={{ minHeight: '90vh' }} className="pb-5">

      <div className='mt-lg-5 mb-3'>
        <h2>Referral Code</h2>
      </div>

      <div>
    <hr />

    <div className="referral-section">
        <p className='text-start'><strong>Elevate Your Network, Elevate Your Success!</strong></p>
        <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
          At BizSolutions, we're not just about business growth; we're about fostering a thriving community of innovative minds. That's why we're thrilled to introduce our exclusive <strong>Referral Program</strong> — a gateway to unlocking new potentials together!
        </p>
        <p><strong>Embrace the Power of Connection!</strong></p>
        <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
          With our specially crafted Referral Code, you're not just inviting partners; you're building bridges to endless opportunities. As you spread the word, you're not only helping others discover the transformative experience of BizSolutions but also paving the way for mutual growth.
        </p>
        <p><strong>Rewards That Resonate with Success!</strong></p>
        <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
          And there's more! Each successful subscription through your referral doesn't just expand our community — it also brings exclusive rewards your way, courtesy of BizSolutions. Because we believe that your effort in growing our network should be celebrated and rewarded.
        </p>
        <p><strong>Your journey towards collaborative success starts here!</strong></p>
      </div>
      <hr />
    </div>
      
      <Form>
        {!referralToken && (
          <div className='py-3'>
            <button onClick={getReferralCode} className="custom-button">
              Generate Referral Token
            </button>
          </div>
        )}
        {referralTokenDisplay}
      </Form>

      {referralToken && !referralLink && (
        <div className='py-3'>
          <button onClick={getReferralLink} className="custom-button">
            Generate Referral Link
          </button>
        </div>
      )}

      {referralLinkDisplay}

      {showCopyAlert && (
        <div className="alert alert-warning floating-alert my-5" role="alert">
          {showCopyAlert === 'token' ? 'Referral token copied to clipboard!' : 'Referral link copied to clipboard!'}
        </div>
      )}

      {showSuccessModal && (
        <Modal show={showSuccessModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {referralLink ? 'Your referral link has been successfully generated!' : 'Your referral token has been successfully generated!'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showErrorModal && (
        <Modal show={showErrorModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {referralLink ? 'There was an error fetching your referral link. Please try again later.' : 'There was an error fetching your referral token. Please try again later.'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </Container>
  );
};

export default ReferralCode;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Modal, Container, Button } from 'react-bootstrap';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import BarSpinner from '../Shared/Spinner/BarSpinner';

import '../../../assets/styles/NewLoginInterface.css';

const apiUrl = process.env.REACT_APP_API_URL;

const PasswordReset = ({ user }) => {

  const navigate = useNavigate();

  const [ email ] = useState(user.email);
  const [ id ] = useState(user._id);
  const [ loading, setLoading ] = useState(false);
  const [ oldPassword, setOldPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
  const [ isPasswordVisible1, setIsPasswordVisible1 ] = useState(false);
  const [ showSuccessModal, setShowSuccessModal ] = useState(false);
  const [ showErrorModal,setShowErrorModal ] = useState(false);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false); 
    navigate('/account');
  };

  const authenticate = async (event) => {
      event.preventDefault();
      try {
        setLoading(true)

          const response = await axios.patch(`${apiUrl}/api/v1/users/reset-password`, {
              email: email,
              userId: id,
              oldPassword: oldPassword,
              newPassword: newPassword
          });
          setLoading(false);

          if (response.status === 200) {
            setShowSuccessModal(true);
          } 

          setNewPassword('');
          setOldPassword('');

      } catch (error) {
        setLoading(false);
        setShowErrorModal(true);

      };
  };

  return (
    loading ? 

    <BarSpinner />
    :
    <>
    <Container style={{ minHeight: '90vh' }} className="pb-5">
      <div className='my-3'>
        <h2>Change Password</h2>
      </div>
      <div>
        <hr />
        <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
        Please be aware that changing your password is an important security action. If you forget your new password, you will not be able to access your account as usual. In case of forgotten passwords, you'll need to reset it via the provided procedures. Ensure your new password is strong and memorable. For assistance with password issues or resets, please contact us at <span style={{ color: '#FF851A' }}>supportus@mybizsolutions.us</span>. Carefully choose your new password to maintain the security of your account.</p>
        <hr />
      </div>
      <div>
      <Form onSubmit={authenticate}>

      <Form.Group className="mb-3" controlId="formBasicOldPassword">
          <Form.Label>Old Password</Form.Label>
          <div style={{ position: 'relative' }}>
              <Form.Control
                  required
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                  style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                  }}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                  {isPasswordVisible ? <PiEyeSlash /> : <PiEye />}
              </div>
          </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <div style={{ position: 'relative' }}>
              <Form.Control
                  required
                  type={isPasswordVisible1 ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                  style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                  }}
                  onClick={() => setIsPasswordVisible1(!isPasswordVisible1)}
              >
                  {isPasswordVisible1 ? <PiEyeSlash /> : <PiEye />}
              </div>
          </div>
      </Form.Group>
          
          <div className='py-5'>
              <button type='submit' className="custom-button">Submit</button>
          </div>

      </Form>
      </div>
    </Container>

     <Modal show={showSuccessModal} onHide={handleCloseModal} centered size="lg" backdrop="static" keyboard={false}>
        <Modal.Body>
            <Container>
                <h1>Password Change Successful!</h1>
                <p>Your password has been successfully updated.</p>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="warning" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showErrorModal} onHide={handleCloseModal} centered size="lg" backdrop="static" keyboard={false}>
        <Modal.Body>
          <Container>
            <h1>Password Change Unsuccessful</h1>
            <p>We were unable to update your password. Please ensure your old password is correct and try again.</p>
          </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="warning" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal>

    </>
  );
};

export default PasswordReset;
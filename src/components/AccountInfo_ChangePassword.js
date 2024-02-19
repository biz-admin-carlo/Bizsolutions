import React from 'react';
import { Container } from 'react-bootstrap';

const Feedbacks = ({ user }) => {

  console.log(user);
  return (
    <Container style={{ minHeight: '90vh' }} className="pb-5">
      <div className='my-3'>
        <h2>Change Password</h2>
      </div>
      <div>
        <hr />
        <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>
        Please be aware that changing your password is an important security action. If you forget your new password, you will not be able to access your account as usual. In case of forgotten passwords, you'll need to reset it via the provided procedures. Ensure your new password is strong and memorable. For assistance with password issues or resets, please contact us at <span style={{ color: '#FF851A' }}>support@bizSolutions.com</span>. Carefully choose your new password to maintain the security of your account.</p>
      </div>
    </Container>
  );
};

export default Feedbacks;
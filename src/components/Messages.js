import React from 'react';
import { Container } from 'react-bootstrap';

const Messages = ({ user }) => {

  console.log(user);
  return (
    <Container style={{ minHeight: '90vh' }} className="pb-5">
      <div className='my-3'>
        <h2>Messages</h2>
      </div>
      <div>
        <hr />
          <p>You have no messages yet. </p>
      </div>
    </Container>
  );
};

export default Messages;
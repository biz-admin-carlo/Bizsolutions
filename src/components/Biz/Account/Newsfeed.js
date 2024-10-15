import React from 'react';
import { Container } from 'react-bootstrap';

const Newsfeed = ({ user }) => {

  return (
    <Container style={{ minHeight: '90vh' }} className="pb-5">
      <div className='my-3'>
        <h2>News Feed</h2>
      </div>
      <div>
        <hr />
          <p>You have no news feed yet. </p>
      </div>
    </Container>
  );
};

export default Newsfeed;
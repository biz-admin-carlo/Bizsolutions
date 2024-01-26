import React from 'react';
import { Container, FloatingLabel, Form, Button, Col} from 'react-bootstrap';

const AccountDetails = ({ user }) => {

  console.log(user);
  return (
    <Container className="pb-5">
      <div className='my-3'>
        <h2>Account Info</h2>
      </div>
      <div>
        <hr />
        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputFirstName" label="First Name*" className="mb-3">
            <Form.Control type="text" placeholder="John"/>
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputLastName" label="Last Name*" className="mb-3">
            <Form.Control type="text" placeholder="Doe" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingSelectGender" className="mb-3" label="Gender">
            <Form.Select aria-label="Gender">
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Rather Not Say</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputEmail" label="Email*" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputContactNumber" label="Contact Number*" className="mb-3">
            <Form.Control type="tel" placeholder="123-456-7890" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputOccupation" label="Occupation" className="mb-3">
            <Form.Control type="text" placeholder="Your Occupation" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputBirthday" label="Birthday*" className="mb-3">
            <Form.Control type="date" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputLocation" label="Location*" className="mb-3">
            <Form.Control type="text" placeholder="City, State" />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingTextareaAbout" label="About Me">
            <Form.Control as="textarea" placeholder="Tell us about yourself" style={{ height: '200px' }} />
          </FloatingLabel>
        </Col>
        
      </div>
      <div>
        <Button variant="warning" className="my-2">Update profile settings</Button>
      </div>
    </Container>
  );
};

export default AccountDetails;
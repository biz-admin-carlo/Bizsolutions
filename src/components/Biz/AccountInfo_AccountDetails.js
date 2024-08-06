import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Button, Col} from 'react-bootstrap';
import BarSpinner from './Reusable_BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountDetails({ user }) {

  const [ loading, setLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    gender: user.gender || '',
    email: user.email || '',
    contactNumber: user.contactNumber || '',
    occupation: user.occupation || '',
    birthday: user.birthday || '',
    location: user.location || '',
    aboutMe: user.aboutMe || ''
  });

  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/update/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const userId = user._id;


  if (loading) {
    return <BarSpinner />;
  }

  return (
    <Container className="pb-5">
      <div className='my-3'>
        <h2>Account Info</h2>
      </div>
      <div>
        <hr />
        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputFirstName" label="First Name*" className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="John" 
                value={formData.firstName}
                onChange={handleInputChange}
                readOnly
              />
            </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputLastName" label="Last Name*" className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Doe" 
              value={formData.lastName}
              onChange={handleInputChange}
              readOnly
            />  
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputEmail" label="Email*" className="mb-3">
            <Form.Control 
              type="email" 
              placeholder="name@example.com"
              aria-label="Gender" 
              value={formData.email}
              onChange={handleInputChange}
              readOnly
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputBirthday" label="Birthday*" className="mb-3">
            <Form.Control 
              type="date" 
              name="birthday"
              value={formData.birthday} 
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingSelectGender" label="Gender" className="mb-3">
            <Form.Select 
              name="gender" 
              aria-label="Gender" 
              value={formData.gender} 
              onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Rather Not Say">Rather Not Say</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputContactNumber" label="Contact Number*" className="mb-3">
            <Form.Control 
              type="tel" 
              name="contactNumber"
              placeholder="123-456-7890" 
              value={formData.contactNumber} 
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputOccupation" label="Occupation" className="mb-3">
            <Form.Control 
              type="text" 
              name="occupation"
              placeholder="Your Occupation" 
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingInputLocation" label="Location*" className="mb-3">
            <Form.Control 
              type="text" 
              name="location"
              placeholder="City, State" 
              value={formData.location} 
              onChange={handleInputChange}
            />

          </FloatingLabel>
        </Col>

        <Col xs={12} md={6} lg={12}>
          <FloatingLabel controlId="floatingTextareaAbout" label="About Me (Max of 200 Characters only)" className="mb-3">
            <Form.Control 
              as="textarea" 
              name="aboutMe"
              placeholder="Tell us about yourself..." 
              value={formData.aboutMe} 
              style={{ height: '200px' }} 
              onChange={handleInputChange}
              maxLength={200} 
            />
          </FloatingLabel>
        </Col>
        
      </div>
      <div>
        <Button variant="warning" className="my-2" onClick={handleUpdate}>Update profile settings</Button>
      </div>
    </Container>
  );
};
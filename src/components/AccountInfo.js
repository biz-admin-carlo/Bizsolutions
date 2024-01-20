import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountInfo() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/users/details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data); 
        setIsLoading(false);
      } else {
        // Handle errors
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="account-info">
      <Container>
        <Card className="account-info my-3">
          <Card.Body>
          <Card.Title>Hello, {user.firstName} {user.lastName}!</Card.Title> {/* Display user's name */}
            <hr />
            <Button variant="warning" className="me-2">Edit Profile</Button>
            <Button variant="secondary">Change Password</Button>
          </Card.Body>
        </Card>

        <p>
        Email Address: {user.email}
        </p>
      </Container>

  </div>
    </>

  );
}

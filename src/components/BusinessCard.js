import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';

const BusinessCard = ({ business, index }) => {
  const handleImageError = (e) => {
    e.target.src = '../assets/app-logo.jpg';
  };

  return (
    <Card className="my-2 p-3" data-aos="fade-up">
      <div className='business-card-div'> 
        <div style={{ marginRight: 10 }}>
          <img
            src={business.image_url}
            alt={business.name}
            className='business-card-img'
            onError={handleImageError}
          />
        </div>
        <Card.Body className='my-3'>
          <Card.Title>{index + 1}. {business.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Average Rating:
            <Rating
              value={business.rating}
              readOnly
              size={20}
            />
          </Card.Subtitle>
          <Card.Subtitle className="mb-2">Contact Number: {business.display_phone}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"><Badge bg="warning">{business.categories[0].title}</Badge></Card.Subtitle>
          <Card.Subtitle className="mb-2">Location: {business.location.city}, {business.location.state}</Card.Subtitle>
        </Card.Body>
      </div>
    </Card>
  );
};

export default BusinessCard;

import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import '../assets/styles/BusinessCard.css';


const BusinessCard = ({ business, index }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/news_large/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg';
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
          <Card.Title> {business.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Average Rating:
            <Rating
              value={business.rating}
              readOnly
              size={20}
              activeColor='#FF851A'
              isHalf
            />
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted custom-inline ">
            <Badge bg="warning">{business.categories[0].title}</Badge>
          </Card.Subtitle>

          <Card.Subtitle className="mb-2 text-muted custom-inline px-2">
            <Badge bg="danger">{business.display_phone}</Badge>
          </Card.Subtitle>

          <Card.Subtitle className="mb-2 text-muted custom-inline">
            <Badge bg="success">{business.location.display_address[2]}</Badge>
          </Card.Subtitle>

          <Card.Subtitle className="my-2">Location: {business.location.city}, {business.location.state}</Card.Subtitle>
        </Card.Body>
      </div>
    </Card>
  );
};

export default BusinessCard;

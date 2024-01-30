import React, { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import '../assets/styles/BusinessCard.css';


const BusinessCard = ({ state, business, index }) => {

  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setSelectedState(state);
  }, [state]);

  function getBaseUrl(url) {
      return url.split('?')[0];
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const distance = business.distance;

  function convertMetersToMiles(distance) {
    const miles = distance * 0.000621371;
    return miles.toFixed(2);
  }  
  const distanceInMiles = convertMetersToMiles(distance);

  const handleImageError = (e) => {
    e.target.src = 'https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/news_large/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg';
  };

  return (
    <Card className="my-3" data-aos="fade-up">
      <div className='business-card-div'> 
        <div style={{ marginRight: 10 }}>
          <img
            src={business.image_url}
            alt={business.name}
            className='business-card-img'
            onError={handleImageError}
          />
        </div>
        <Card.Body>
          <Card.Title> {business.name}</Card.Title>
            <a href={business.url} target="_blank" className='text-secondary url-link'>
                <p className='text-secondary url-link'>{getBaseUrl(business.url)}</p>
            </a>
          <Card.Subtitle className="mb-2">
            Average Rating:
            <Rating
              value={business.rating}
              readOnly
              size={20}
              activeColor='#FF851A'
              isHalf
            />
          </Card.Subtitle>

        <div className='text-center-sm'>
          {selectedState !== null && (
            <Card.Subtitle className="mb-2 me-2 text-muted custom-inline">
              Distance from My Location: 
              <Badge bg="secondary ms-1"> {distanceInMiles} Miles</Badge>
            </Card.Subtitle>
          )}

          <Card.Subtitle className="mb-2 text-muted custom-inline ">
            <Badge bg="warning">{business.categories[0].title}</Badge>
          </Card.Subtitle>

          <Card.Subtitle className="mb-2 text-muted custom-inline px-2">
            <Badge bg="danger">{business.display_phone}</Badge>
          </Card.Subtitle>

          <Card.Subtitle className="mb-2 text-muted custom-inline">
            <Badge bg="success">{business.location.display_address[2]}</Badge>
          </Card.Subtitle>
        </div>

          <Card.Subtitle className="my-2 text-secondary">Location: {business.location.city}, {business.location.state}</Card.Subtitle>
        </Card.Body>
      </div>
    </Card>
  );
};

export default BusinessCard;

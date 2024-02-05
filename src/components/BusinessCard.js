import React, { useEffect, useState } from 'react';
import { Card, Container, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import '../assets/styles/BusinessCard.css';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import L from 'leaflet'; // Import Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'; // Default marker icon
import iconShadow from 'leaflet/dist/images/marker-shadow.png'; // Default marker shadow

const BusinessCard = ({ state, business, index }) => {

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setSelectedState(state);
  }, [state]);

  function getBaseUrl(url) {
      return url.split('?')[0];
  }

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
    <>
      <Container>
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

            {/* Add MapContainer here */}
              <MapContainer
                center={[business.coordinates.latitude, business.coordinates.longitude]}
                zoom={13}
                className="map-container" // Added class for styling
                whenCreated={mapInstance => { mapInstance.invalidateSize(); }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[business.coordinates.latitude, business.coordinates.longitude]} />
              </MapContainer>
          </div>
        </Card>
      </Container>
    </>

  );
};

export default BusinessCard;

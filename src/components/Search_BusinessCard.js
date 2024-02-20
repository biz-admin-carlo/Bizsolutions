import React, { useEffect, useState } from 'react';
import { Card, Container, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import '../assets/styles/Search_BusinessCard.css';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MdDirectionsWalk } from "react-icons/md";
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet'; 
import icon from 'leaflet/dist/images/marker-icon.png'; 
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const BusinessCard = ({ state, business, index }) => {

  const openGoogleDirections = () => {
    const destination = encodeURIComponent(business.location.display_address.join(', '));
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, '_blank');
  };

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
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
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
      <Container className="visible-md-lg hidden-sm">
        <div className="content-wrapper">

          <div className="image-container">
            <img
              src={business.image_url}
              alt={business.name}
              onError={handleImageError}
              className="rounded-image"
            />
          </div>

          <div className="text-container px-md-3">
            <h5>{business.name}</h5>
            <a href={business.url} target="_blank" rel="noopener noreferrer" className='text-secondary url-link'>
              <p className='text-secondary url-link'>{getBaseUrl(business.url)}</p>
            </a>
            <div className="rating-row">
              <span className='text-secondary url-link'>Average Rating:</span>
              <span className="rating-container">
                <Rating
                  value={business.rating}
                  readOnly
                  size={20}
                  activeColor='#FF851A'
                  isHalf
                />
              </span>
            </div>

            <div className="rating-row">
              <span className='text-secondary url-link'>Get Directions:
                <MdDirectionsWalk onClick={openGoogleDirections} className="icon-style" style={{ fontSize: '24px' }}/>
              </span>
            </div>

            {selectedState !== null && (
              <div className="rating-row">
                <span className='text-secondary url-link'>Distance from My Location:
                  <Badge bg="secondary ms-1"> {distanceInMiles} Miles</Badge>
                </span>
              </div>
            )}

            <div className='pt-lg-2'>
                <Card.Subtitle className="mb-1 text-muted custom-inline ">
                  <Badge bg="warning">{business.categories[0].title}</Badge>
                </Card.Subtitle>

                <Card.Subtitle className="mb-1 text-muted custom-inline">
                  <Badge bg="danger">{business.display_phone}</Badge>
                </Card.Subtitle>

                <Card.Subtitle className="mb-1 text-muted custom-inline">
                  <Badge bg="success">{business.location.display_address[2]}</Badge>
                </Card.Subtitle>
            </div>
          </div>

          <div className="map-container d-none d-lg-block">
            <MapContainer
                center={[business.coordinates.latitude, business.coordinates.longitude]}
                zoom={12}
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

        </div>
      </Container>

    <Container className="d-block d-md-none">
      <div className="d-flex flex-column align-items-center">

        {/* Image Container */}
        <div className="image-container mb-3"> {/* Added margin-bottom for spacing */}
            <img
                src={business.image_url}
                alt={business.name}
                onError={handleImageError}
                className="rounded-image img-fluid"
            />
        </div>

        <Container>
          <div className="row">
            <div className="col-12 col-md-8 text-container px-2 px-md-3">
              <h5>{business.name}</h5>
              <a href={business.url} target="_blank" rel="noopener noreferrer" className='text-secondary url-link'>
                <p className='text-secondary url-link'>{getBaseUrl(business.url)}</p>
              </a>
              <div className="rating-row">
                <span className='text-secondary url-link'>Average Rating:</span>
                <span className="rating-container">
                  <Rating
                    value={business.rating}
                    readOnly
                    size={20}
                    activeColor='#FF851A'
                    isHalf
                  />
                </span>
              </div>

              <div className="rating-row">
                <span className='text-secondary url-link'>Get Directions:
                  <MdDirectionsWalk onClick={openGoogleDirections} className="icon-style" style={{ fontSize: '24px' }}/>
                </span>
              </div>

              {selectedState !== null && (
                <div className="rating-row">
                  <span className='text-secondary url-link'>Distance from My Location:
                    <Badge bg="secondary ms-1"> {distanceInMiles} Miles</Badge>
                  </span>
                </div>
              )}

              <div className='pt-lg-2'>
                <Card.Subtitle className="mb-1 text-muted custom-inline">
                  <Badge bg="warning">{business.categories[0].title}</Badge>
                </Card.Subtitle>

                <Card.Subtitle className="mb-1 text-muted custom-inline">
                  <Badge bg="danger">{business.display_phone}</Badge>
                </Card.Subtitle>

                <Card.Subtitle className="mb-1 text-muted custom-inline">
                  <Badge bg="success">{business.location.display_address[2]}</Badge>
                </Card.Subtitle>
              </div>
            </div>
          </div>
        </Container>

      </div>
    </Container>


    </>
  );
};

export default BusinessCard;
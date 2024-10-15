import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MdDirectionsWalk } from "react-icons/md";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import '../../assets/styles/Search_BusinessCard.css';

const defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

const BusinessCard = ({ locationInfo, business }) => {
    const openGoogleDirections = () => {
        const destination = encodeURIComponent(business.location.display_address.join(', '));
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(googleMapsUrl, '_blank');
    };

    const distanceInMiles = (business.distance * 0.000621371).toFixed(2);

    const handleImageError = (e) => {
        e.target.src = 'https://www.example.com/default-image.jpg';
    };

    const isValidUrl = url => url && url !== 'none';
    const getBaseUrl = url => {
        try {
            return new URL(url).hostname;
        } catch (error) {
            return "";
        }
    };

    return (
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
                    <a href={isValidUrl(business.url) ? business.url : undefined} target="_blank" rel="noopener noreferrer" className='text-secondary url-link'>
                        {isValidUrl(business.url) ? getBaseUrl(business.url) : 'No URL provided'}
                    </a>
                    <div className="rating-row">
                        <span className='text-secondary url-link'>Average Rating:</span>
                        <Rating value={business.rating} readOnly size={20} activeColor='#FF851A' isHalf />
                    </div>
                    <div className="rating-row">
                        <span className='text-secondary url-link'>Get Directions:
                            <MdDirectionsWalk onClick={openGoogleDirections} className="icon-style" style={{ fontSize: '24px' }} />
                        </span>
                    </div>
                    <div className="rating-row">
                        <span className='text-secondary url-link'>Distance from My Location: <Badge bg="secondary ms-1">{distanceInMiles} Miles</Badge></span>
                    </div>
                </div>
                {business.coordinates.latitude && business.coordinates.longitude && (
                    <div className="map-container d-none d-lg-block">
                        <MapContainer
                            center={[business.coordinates.latitude, business.coordinates.longitude]}
                            zoom={12}
                            className="map-container"
                            whenCreated={mapInstance => mapInstance.invalidateSize()}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[business.coordinates.latitude, business.coordinates.longitude]} />
                        </MapContainer>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default BusinessCard;

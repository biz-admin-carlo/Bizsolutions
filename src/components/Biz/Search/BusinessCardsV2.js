import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FaStar, FaRegStarHalfStroke } from 'react-icons/fa6';
import '../../../assets/styles/NewSearchResults.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { SiGooglemaps } from "react-icons/si";

const defaultImage = 'https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg';

export default function BusinessCard({ business, index }) {
  const { biz_images, image_url, name, location, phone, categories, isBizDB, rating, review_count } = business;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
        {hasHalfStar && <FaRegStarHalfStroke />}
      </>
    );
  };

  const getCurrencySymbol = (country) => {
    if (country === 'Philippines') {
      return '₱';
    } else {
        return '$';
    }
    
  };

  const currencySymbol = getCurrencySymbol(business.country);

  return (
    <Card className='my-3 mx-3 p-3 d-flex flex-row hover-card' style={{ border: 'none' }} data-aos="fade-up">
      <Card.Img
        src={biz_images && biz_images.length > 0 ? biz_images[0].url : image_url || defaultImage}
        className="restaurant-image"
        style={{ width: '200px', objectFit: 'cover' }}
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = defaultImage;
        }}
        alt={`Image of ${name || 'Business Image'}`}
      />
      <Card.Body>
        <Card.Title className="mb-2" style={{ fontWeight: 'bold' }}>
            {index + 1}. {name ? name.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") : ""}
        </Card.Title>
        
        <div className="d-flex align-items-center gap-1 mb-2">
          <div className="d-flex text-warning">
            {renderStars(rating || 0)}
          </div>
            <div className="business-rating d-flex align-items-center">
                {review_count > 0 ? (
                <span className="ms-1">{rating || 0} ({review_count} Reviews)</span>
                ) : (
                <span className="badge bg-success ms-1">Is Open Now!</span>
                )}
                {/* <SiGooglemaps className="ms-2 icon-orange" /> */}
</div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <Badge bg="secondary" className="px-2">{categories && categories[0]?.title}</Badge>
          <Badge bg="secondary" className="px-2">{phone}</Badge>
          <span className="text-muted">•</span>
          <span className="text-success">{currencySymbol}{'$$$'}</span>
          <span className="text-muted">•</span>
          <span>{location?.city}</span>
        </div>

        <div className="text-muted text-bold">
          <span className="text-danger">Available</span> at {location?.address1}
        </div>

        {isBizDB && <Badge pill bg="warning" className="mt-2">Powered By BizSolutions</Badge>}
      </Card.Body>
    </Card>
  );
}

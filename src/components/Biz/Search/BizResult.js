import { Badge, Container, Breadcrumb, Card, Spinner, Image, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getBizDetails } from '../../../utils/Biz/BizUtils.js';
import { SiGooglemaps } from "react-icons/si";
import { Icon } from 'leaflet';
import '../../../assets/styles/BizResult.css';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});


function BizResult() {
    const navigate = useNavigate();
    const defaultImage = 'https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg';
    const { bizID } = useParams();
    const [ bizDetails, setBizDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const openGoogleDirections = () => {
        const destination = encodeURIComponent(bizDetails?.location.display_address.join(', '));
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(googleMapsUrl, '_blank');
    };

    const addressAbbreviations = {
        'AVE': 'Avenue',
        'BLVD': 'Boulevard',
        'CT': 'Court',
        'DR': 'Drive',
        'HWY': 'Highway',
        'LN': 'Lane',
        'PKWY': 'Parkway',
        'PL': 'Place',
        'RD': 'Road',
        'ST': 'Street',
        'SQ': 'Square',
        'TR': 'Trail',
        'N': 'North',
        'S': 'South',
        'E': 'East',
        'W': 'West',
        'NE': 'Northeast',
        'NW': 'Northwest',
        'SE': 'Southeast',
        'SW': 'Southwest',
        'APT': 'Apartment',
        'STE': 'Suite',
        'UNIT': 'Unit',
        'FL': 'Floor'
    };

    useEffect(() => {
        const fetchBizDetails = async () => {
          try {
            const data = await getBizDetails(bizID);
            setBizDetails(data);
          } catch (err) {
            setError('Failed to fetch business details');
          } finally {
            setLoading(false);
          }
        };
        
        fetchBizDetails();
    }, [bizID]);

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return 'Phone number not available';

        const cleaned = phoneNumber.replace(/\D/g, '');

        if (cleaned.length !== 10) {
            return phoneNumber; // Return original if not valid
        }

        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    };

    const expandAddressAbbreviations = (address) => {
        if (!address) return '';
        
        return address.split(' ').map(word => {
            const cleanWord = word.replace(/\./g, '').toUpperCase();
            return addressAbbreviations[cleanWord] || word;
        }).join(' ');
    };

    const formatAddress = (location) => {
        if (!location) return 'Location not available';

        const parts = [];
        if (location.address1) {
            parts.push(expandAddressAbbreviations(location.address1));
        }
        if (location.address2) {
            parts.push(expandAddressAbbreviations(location.address2));
        }
        if (location.city) parts.push(location.city);
        if (location.state) parts.push(location.state);
        if (location.postal_code) parts.push(location.postal_code);

        const formattedAddress = parts
            .filter(part => part && part.trim() !== '')
            .join(', ');

        return formattedAddress || 'Location not available';
    };

    if (loading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }


  return (
    <>
        <Container>
            <Card className='py-3 px-3 mt-3 rounded-0'>
                <div className="pt-2 px-3 mt-3">
                    <Breadcrumb>
                        <Breadcrumb.Item as={Link} to="/">
                            Home
                        </Breadcrumb.Item>                            
                        <Breadcrumb.Item 
                            onClick={() => navigate(-1)} 
                            style={{ cursor: 'pointer' }}
                        >
                            Local Biz
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{bizDetails?.name || 'Biz Name'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='pt-2 ms-3'>
                <Card.Title className="d-flex align-items-center">
                    <h1 className="mb-0">{bizDetails?.name || 'Biz Name'}</h1>
                    {!bizDetails?.is_Closed && <Badge pill bg="success" className="ms-3">Open Now</Badge>}
                </Card.Title>       


                <Row>
                    {/* Business Details */}
                    <Col md={6}>
                        <Card.Body className='pb-0'>
                            {formatAddress(bizDetails?.location)}
                        </Card.Body>
                        <Card.Body className='pb-0'>
                            {bizDetails?.hours || 'Business hours not available'}
                        </Card.Body>
                        <Card.Body className='pb-0'>
                            {formatPhoneNumber(bizDetails?.phone)}
                        </Card.Body>
                        <Card.Body className='pb-0'>
                            Category: <Badge pill bg="warning">{bizDetails?.categories[0].title}</Badge>
                        </Card.Body>
                        <Card.Body className='pb-0'>
                            <SiGooglemaps onClick={openGoogleDirections}/>
                        </Card.Body>

                    </Col>

                    {/* Images Section */}
                    <Col md={6}>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {bizDetails?.biz_images && bizDetails.biz_images.length > 0 ? (
                                bizDetails.biz_images.slice(0, 4).map((image, index) => (
                                    <Image 
                                        key={index}
                                        src={image.url || defaultImage}
                                        rounded
                                        className="business-image"
                                        style={{
                                            width: '280px',
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultImage;
                                        }}
                                    />
                                ))
                            ) : (
                                <Image 
                                    src={defaultImage}
                                    rounded
                                    className="business-image"
                                    style={{
                                        width: '280px',
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <div 
                            className="map-container d-none d-lg-block" 
                            style={{
                                height: '400px',
                                width: '100%',
                                marginBottom: '2rem',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}
                        >
                            {bizDetails?.coordinates && (
                                <MapContainer
                                    center={[
                                        bizDetails.coordinates.coordinates[1], 
                                        bizDetails.coordinates.coordinates[0]
                                    ]}
                                    zoom={14}
                                    style={{ height: '100%', width: '100%' }}
                                    whenCreated={(mapInstance) => {
                                        setTimeout(() => {
                                            mapInstance.invalidateSize();
                                        }, 100);
                                    }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker 
                                        position={[
                                            bizDetails.coordinates.coordinates[1], 
                                            bizDetails.coordinates.coordinates[0]
                                        ]} 
                                    />
                                </MapContainer>
                            )}
                        </div>
                    </Col>
                </Row>

                </div>
            </Card>
        </Container>
    </>

  );
}

export default BizResult;


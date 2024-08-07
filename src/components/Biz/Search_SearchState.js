import React, { useState, useEffect } from 'react';
import { getBizViaCoords, getBizViaState } from '../../utils/Biz/ClientUtils';
import { Card, Badge, Pagination } from 'react-bootstrap';
import '../../assets/Biz/styles/SearchResult.css';

const defaultImage = 'https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg';

export default function SearchState({location, category}) {
    const [ businesses, setBusinesses ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 12;

    const fetchBusinesses = async () => {
        let result = null;
        try {
            if (location.includes('Lat') && location.includes('Long')) {
                const [lat, long] = location.replace('Lat:', '').replace('Long:', '').split(',');
                result = await getBizViaCoords(parseFloat(lat), parseFloat(long), category);
            } else {
                result = await getBizViaState(location, category);
            }
            setBusinesses(result.data.data.businesses);
        } catch (error) {
            setBusinesses([]);
        } 
    };

    useEffect(() => {
        fetchBusinesses();
    }, [location, category]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = businesses.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(businesses.length / itemsPerPage);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    function toTitleCase(str) {
        if (!str) return ''; 
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    
    // console.log(currentItems[0].biz_images[0].url);

    return (
        <div>
            <h1>Bizness Listings</h1>
            <div className="business-container">
                {currentItems.map((business, index) => (
                    <div key={index} className="business-card">
                        <Card style={{ width: '18rem' }} className='my-2'>
                        <Card.Img 
                            variant="top" 
                            src={
                                business && (business.biz_images && business.biz_images.length > 0 ? business.biz_images[0].url : 
                                business.image_url ? business.image_url : 
                                defaultImage)
                            } 
                            onError={(e) => { 
                                if (e.target.src !== defaultImage) {
                                e.target.onerror = null; 
                                e.target.src = defaultImage;
                                }
                            }} 
                            alt={`Image of ${business ? business.name : 'Business Image'}`} 
                        />

                            <Card.Body>
                                <h5 className='biz-color text-start'>{toTitleCase(business.name)}</h5>                                <h6>{business.location.address1}</h6>
                                <Badge pill bg="primary">{business.phone}</Badge><br/>
                                <Badge pill bg="danger">{business.categories[0].title}</Badge><br/>
                                <Badge pill bg="success">Create Website with Us!</Badge><br/>
                                {business.isBizDB ? (
                                    <Badge pill bg="warning">Powered By BizSolutions</Badge>
                                ) : null}                            
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            {businesses.length === 0 && <p>No businesses found.</p>}
            {businesses.length > 0 && (
                <Pagination className="justify-content-center">{paginationItems}</Pagination>
            )}
        </div>
    );
}

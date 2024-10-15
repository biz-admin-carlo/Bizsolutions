import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';

export default function BusinessStats({ 
  totalBusinesses, 
  startIndex, 
  endIndex, 
  numberOfBizWithImages, 
  activeBusinesses, 
  inactiveBusinesses, 
  itemsPerPage, 
  onItemsPerPageChange 
}) {
  return (
    <div className="d-flex justify-content-between align-items-center pb-3">
      <div>
        <h6 className="responsive-title">Registered BizNess</h6>
        <Card.Subtitle className='text-secondary'>
          Showing {startIndex} to {endIndex} out of {totalBusinesses} businesses.
        </Card.Subtitle>
        <Card.Subtitle className='text-secondary'>
          Out of {totalBusinesses} businesses, <a className='biz-color' style={{ textDecoration: 'none' }}>only {numberOfBizWithImages} have images</a>.
        </Card.Subtitle>
        <Card.Subtitle className='text-secondary'>
          Active Bizness: <a className='biz-color' style={{ textDecoration: 'none' }}>{activeBusinesses} active!</a>
        </Card.Subtitle>
        <Card.Subtitle className='text-secondary'>
          Inactive Businesses (Archived): <a className='biz-color' style={{ textDecoration: 'none' }}>{inactiveBusinesses} archived</a>.
        </Card.Subtitle>
        <Card.Subtitle className='text-secondary'>
          Manager's Account  
        </Card.Subtitle>
      </div>
      <div className='py-3'>
        <Dropdown onSelect={onItemsPerPageChange}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Items per page: {itemsPerPage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[5, 10, 20, 50, 100].map((number) => (
              <Dropdown.Item key={number} eventKey={number}>
                {number}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
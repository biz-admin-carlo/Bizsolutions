import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBreadcrumbs = ({ coordinates, category, locationState }) => {
  const navigate = useNavigate();

  const generateBreadcrumbText = () => {
    if (coordinates) {
      return `Results for ${category} Near Me`;
    } else if (locationState) {
      return `Results for ${category} in ${locationState}`;
    }
    return `Results for ${category}`;
  };

  return (
    <Breadcrumb className='pt-2'>
      <Breadcrumb.Item onClick={() => navigate('/')} className="no-text-decoration">Home</Breadcrumb.Item>
      <Breadcrumb.Item active className="no-text-decoration">
        {generateBreadcrumbText()}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default SearchBreadcrumbs;

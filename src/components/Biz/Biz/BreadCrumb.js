import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBreadcrumbs = () => {
  const navigate = useNavigate();

  return (
    <Breadcrumb className='pt-2'>
      <Breadcrumb.Item onClick={() => navigate('/')} className="no-text-decoration">Home</Breadcrumb.Item>
      <Breadcrumb.Item active className="no-text-decoration">
        My Registered Biz
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default SearchBreadcrumbs;

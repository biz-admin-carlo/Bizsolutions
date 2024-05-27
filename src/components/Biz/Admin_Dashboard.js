import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table } from 'react-bootstrap';
import { getMyCreatedBiz } from '../../utils/Biz/BizUtils.js';
import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';

import userIcon from '../../assets/Biz/icons/icon-round-image.png';
import '../../assets/Biz/styles/AccountInfo.css';

import UserContext from '../../UserContext';

export default function AdminDashboard() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ businesses, setBusinesses ] = useState([]);

  useEffect(() => {
    async function loadBusinesses() {
      const bizData = await getMyCreatedBiz();
      if (bizData && !bizData.error) {
        setBusinesses(bizData.httpMessage); 
        setIsLoading(false);
      } else {
        // console.error('Failed to fetch businesses:', bizData.error);
        navigate('/login'); 
      }
    }
    
    loadBusinesses();
  }, [navigate]);

  // if (isLoading) {
  //   return <BarSpinner />;
  // }

  return (
    <>
      {/* <Container style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
      <Container style={{ minHeight: '85vh'}}>
        <div className='user-info-container' style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '3rem' }}>
          <img src={userIcon} alt="MyBiz Solutions User's Default Image"  width={50} height={50} className='mx-3'/> 
          <div>
            <h6 className="responsive-title">
              Hello, {user.firstName} {user.lastName}!
            </h6>
            <Card.Subtitle className='text-secondary'>
              This is all your added biz-ness!
            </Card.Subtitle>
          </div>
        </div>
        <hr/>
        <div className="table-responsive">
          <Table striped bordered hover className='text-center'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Alias</th>
                <th>Image URL</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Categories</th>
                <th>Transactions</th>
                <th>Rating</th>
                <th>Review Count</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Is Archived</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((biz, index) => (
                <tr key={biz._id}>
                  <td>{index + 1}</td>
                  <td>{biz.name}</td>
                  <td>{biz.alias}</td>
                  <td>{biz.image_url}</td>
                  <td>{biz.display_phone}</td>
                  <td>{`${biz.location.address1}, ${biz.location.city}`}</td>
                  <td>{biz.categories.map(cat => cat.title).join(', ')}</td>
                  <td>{biz.transactions.join(', ')}</td>
                  <td>{biz.rating}</td>
                  <td>{biz.review_count}</td>
                  <td>{new Date(biz.createdAt).toLocaleString()}</td>
                  <td>{new Date(biz.updatedAt).toLocaleString()}</td>
                  <td>{biz.isArchived ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <AppFooter />
    </>
  );
}

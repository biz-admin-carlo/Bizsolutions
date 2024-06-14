import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, Accordion, Button } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { getMyCreatedBiz } from '../../utils/Biz/BizUtils.js';
import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';
import UploadImageModal from './Admin_UploadBizImage.js';
import userIcon from '../../assets/Biz/icons/icon-round-image.png';
import '../../assets/Biz/styles/AccountInfo.css';

import UserContext from '../../UserContext';

export default function AdminDashboard() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ businesses, setBusinesses ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ currentBizId, setCurrentBizId ] = useState(null);
  const [ adminId, setAdminId ] = useState(null);
  console.log(user._id);

  const openModal = (bizId) => {
    setCurrentBizId(bizId);
    setShowModal(true);
    setAdminId(user._id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  const handleUpload = (file) => {
    if (!file) return;
    // Implement the logic to upload the file to your backend which will handle S3 upload
    console.log("Uploading", file.name);
    // Close the modal
    closeModal();
  };

  const handleUploadSuccess = (bizId, updatedBiz) => {
    setBusinesses(businesses =>
      businesses.map(biz => biz._id === bizId ? { ...biz, biz_images: updatedBiz.biz_images } : biz)
    );
  };

  // if (isLoading) {
  //   return <BarSpinner />;
  // }

  return (
    <>
      <Container style={{ minHeight: '85vh'}}>
      <div className='user-info-container' style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '3rem' }}>
          <img src={userIcon} alt="MyBiz Solutions User's Default Image" width={50} height={50} className='mx-3'/> 
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                  <h6 className="responsive-title">
                      Hello, {user.firstName} {user.lastName}!
                  </h6>
                  <Card.Subtitle className='text-secondary'>
                      This is all your added biz-ness!
                  </Card.Subtitle>
              </div>
              <IoRefreshCircle 
                style={{ fontSize: '44px', color: 'green', cursor: 'pointer' }} 
                onClick={() => loadBusinesses()}  
              />       
            </div>
      </div>
        <hr/>

        <div className="table-responsive">
          <Accordion defaultActiveKey="0">
            {businesses.map((biz, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{biz.name}</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Biz ID</td>
                          <td>{biz._id}</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>{biz.name}</td>
                        </tr>
                        <tr>
                          <td>Alias</td>
                          <td>{biz.alias}</td>
                        </tr>
                        <tr>
                          <td>Image</td>
                          <td>
                            {biz.biz_images && biz.biz_images.length > 0 ? (
                              <img src={biz.biz_images[biz.biz_images.length - 1].url} alt={biz.name} style={{ width: "120px" }}/>
                            ) : (
                              <span className="fst-italic">No image available</span>
                              )}
                          </td>                        
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>{biz.display_phone}</td>
                        </tr>
                        <tr>
                          <td>Location</td>
                          <td>{`${biz.location.address1}, ${biz.location.city}`}</td>
                        </tr>
                        <tr>
                          <td>Categories</td>
                          <td>{biz.categories.map(cat => cat.title).join(', ')}</td>
                        </tr>
                        <tr>
                          <td>Transactions</td>
                          <td>{biz.transactions.join(', ')}</td>
                        </tr>
                        <tr>
                          <td>Rating</td>
                          <td>{biz.rating}</td>
                        </tr>
                        <tr>
                          <td>Review Count</td>
                          <td>{biz.review_count}</td>
                        </tr>
                        <tr>
                          <td>Created At</td>
                          <td>{new Date(biz.createdAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Updated At</td>
                          <td>{new Date(biz.updatedAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Is Archived</td>
                          <td>{biz.isArchived ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </Table>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="warning" onClick={() => openModal(biz._id)}>Upload Biz Image</Button>
                      {/* <Button variant="danger" className='mx-1'>Delete</Button> */}
                    </div>
                  </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <UploadImageModal 
            show={showModal} 
            handleClose={closeModal} 
            handleUpload={handleUpload}
            onUploadSuccess={handleUploadSuccess} 
            bizID={currentBizId} 
            adminId={adminId}
          />
        </div>

      </Container>
      <AppFooter />
    </>
  );
}

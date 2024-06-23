import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, Accordion, Button, Pagination, Dropdown } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { getMyCreatedBiz, archiveBiz } from '../../utils/Biz/BizUtils.js';
import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';
import UploadImageModal from './Admin_UploadBizImage.js';
import ArchiveBizModal from './Admin_ArchiveBizModal.js';
import userIcon from '../../assets/Biz/icons/icon-round-image.png';
import '../../assets/Biz/styles/AccountInfo.css';

import UserContext from '../../UserContext';

export default function AdminDashboard() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ businesses, setBusinesses ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage, setItemsPerPage ] = useState(20);
  const [ totalBusinesses, setTotalBusinesses ] = useState(businesses.length);
  const [ showModalArchive, setShowModalArchive ] = useState(false);
  const [ currentBizId, setCurrentBizId ] = useState(null);
  const [ adminId, setAdminId ] = useState(null);

  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  const handleItemsPerPageChange = (eventKey, event) => {
    setItemsPerPage(Number(eventKey));
    setCurrentPage(1);
  };

  useEffect(() => {
    setTotalBusinesses(businesses.length);
  }, [businesses]);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalBusinesses);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedBusinesses = businesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (bizId) => {
    setCurrentBizId(bizId);
    setShowModal(true);
    setAdminId(user._id);
  };

  const openArchiveModal = (bizId) => {
    setCurrentBizId(bizId);
    setShowModalArchive(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeArchiveModal = () => {
    setShowModalArchive(false);
  };

  const handleArchive = async (bizId) => {
    const result = await archiveBiz(bizId); // Use the function from BizUtils
    if (result.success) {
      // Optionally update the local state to reflect the archive without re-fetching from the server
      setBusinesses(businesses.map(biz => {
        if (biz._id === bizId) return { ...biz, isArchived: true };
        return biz;
      }));
    } else {
    }
    closeArchiveModal(); // Close the modal after action
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
    // console.log("Uploading", file.name);
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

      <div className="d-flex justify-content-between align-items-center pb-3">
        <div>
            <h6 className="responsive-title">
              Registered BizNess
            </h6>
            <Card.Subtitle className='text-secondary'>
              Showing {startIndex} to {endIndex} out of {totalBusinesses} businesses.
            </Card.Subtitle>
        </div>
        <div className='py-3'>
          <Dropdown onSelect={handleItemsPerPageChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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

        <div className="table-responsive">
          <Accordion defaultActiveKey="0">
            {displayedBusinesses.map((biz, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{biz.name}</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover>
                      <tbody>
                        <tr className='text-center fw-bold'>
                          <td>Is Biz Active</td>
                          <td className={biz.isArchived ? 'text-danger' : 'text-success'}>{biz.isArchived ? 'False' : 'True'}</td>
                        </tr>
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
                          <td>Old Image URL</td>
                          <td>{biz.image_url}</td>
                        </tr>
                        <tr>
                          <td>
                            New Image
                          </td>                          
                          <td>
                            {biz.biz_images && biz.biz_images.length > 0 ? (
                              <div>
                                {biz.biz_images.slice(-3).reverse().map((image, index) => (
                                  <img key={index} src={image.url} alt={`Image ${index + 1} of ${biz.name}`} style={{ width: "120px", marginLeft: index !== 0 ? "5px" : "0px" }}/>
                                ))}
                              </div>
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
                      </tbody>
                    </Table>
                    
                    <div className="d-flex justify-content-end">
                      {!biz.isArchived && <Button variant="danger" onClick={() => openArchiveModal(biz._id)}>Archive Biz</Button>}
                      <Button className="mx-1" variant="warning" onClick={() => openModal(biz._id)}>Upload Biz Image</Button>
                    </div>
                  </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <Pagination className="justify-content-center py-5">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

            {currentPage > 4 && <Pagination.Item onClick={() => handlePageChange(1)}>{1}</Pagination.Item>}
            {currentPage > 4 && <Pagination.Ellipsis disabled />}

            {currentPage > 2 && <Pagination.Item onClick={() => handlePageChange(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
            {currentPage > 1 && <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage < totalPages && <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
            {currentPage < totalPages - 1 && <Pagination.Item onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</Pagination.Item>}

            {currentPage < totalPages - 3 && <Pagination.Ellipsis disabled />}
            {currentPage < totalPages - 3 && <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>}

            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>


          <UploadImageModal 
            show={showModal} 
            handleClose={closeModal} 
            handleUpload={handleUpload}
            onUploadSuccess={handleUploadSuccess} 
            bizID={currentBizId} 
            adminId={adminId}
          />
          <ArchiveBizModal 
            show={showModalArchive} 
            handleClose={closeArchiveModal} 
            handleArchive={handleArchive}
            bizID={currentBizId}
          />
        </div>

      </Container>
      <AppFooter />
    </>
  );
}

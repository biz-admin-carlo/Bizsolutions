import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Accordion, Button, Pagination, Dropdown, ListGroup } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { getMyVendorManagerBizNess, archiveBiz } from '../../utils/Biz/BizUtils.js';
import { retrieveAllTransaction } from '../../utils/Biz/AdminUtils.js';
import { returnFullName } from '../../utils/Biz/UserUtils.js';
import AppFooter from './Application_Footer.js';
import UploadImageModal from './Admin_UploadBizImage.js';
import ArchiveBizModal from './Admin_ArchiveBizModal.js';
import TransactModal from './Admin_TransactModal.js';
import userIcon from '../../assets/Biz/icons/icon-round-image.png';
import '../../assets/Biz/styles/AccountInfo.css';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';

export default function SeeBizNezManager() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ businesses, setBusinesses ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage, setItemsPerPage ] = useState(20);
  const [ totalBusinesses, setTotalBusinesses ] = useState(businesses.length);
  const [ numberOfBizWithImages, setNumberOfBizWithImages ] = useState(0);
  const [ showModalArchive, setShowModalArchive ] = useState(false);
  const [ currentBizId, setCurrentBizId ] = useState(null);
  const [ adminId, setAdminId ] = useState(null);
  const [ activeBusinesses, setActiveBusinesses ] = useState(0);
  const [ inactiveBusinesses, setInactiveBusinesses ] = useState(0);
  const [ currentBizName, setCurrentBizName ] = useState('');
  const [ showModalTransact, setShowModalTransact ] = useState(false);
  const [ adminToken, setAdminToken ] = useState(''); 
  const [ transactions, setTransactions ] = useState({});
  const [ visibleTransactions, setVisibleTransactions ] = useState({});
  const [fullNames, setFullNames] = useState({});

  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  const fetchFullName = async (userId, bizId) => {
    const result = await returnFullName(userId);
    if (result.success) {
      setFullNames(prev => ({
        ...prev,
        [bizId]: result.fullName, // Associate the full name with the business ID
      }));
    } else {
      setFullNames(prev => ({
        ...prev,
        [bizId]: 'Full Name Not Available',
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAdminToken(token)
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
  
    return `${formattedDate} at ${formattedTime}`;
  };

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

  const openModal = (bizId, bizName) => {
    setCurrentBizName(bizName);
    setCurrentBizId(bizId);
    setShowModal(true);
    setAdminId(user._id);
  };

  const openArchiveModal = (bizId) => {
    setCurrentBizId(bizId);
    setShowModalArchive(true);
  };

  const openTransactModal = async (bizId) => {
    setCurrentBizId(bizId);
    setShowModalTransact(true);
    setAdminId(user._id);
  
    if (!transactions[bizId]) {
      const fetchedTransactions = await retrieveAllTransaction(adminToken, bizId);
      setTransactions(prev => ({ ...prev, [bizId]: fetchedTransactions }));
    }
  };

  useEffect(() => {
    // Fetch full names for all businesses
    displayedBusinesses.forEach(biz => {
      if (biz.userID && !fullNames[biz._id]) {
        fetchFullName(biz.userID, biz._id);
      }
    });
  }, [displayedBusinesses]);
  

  const handleTransactionComplete = async () => {
    if (currentBizId) {
        const updatedTransactions = await retrieveAllTransaction(adminToken, currentBizId);
        setTransactions(updatedTransactions);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { color: 'green', fontWeight: 'bold' };
      case 'Closed':
        return { color: 'teal', fontWeight: 'bold' };
      case 'Cancelled':
        return { color: 'red', fontWeight: 'bold' };
      case 'Declined':
        return { color: 'orange', fontWeight: 'bold' };
      default:
        return { fontWeight: 'bold' };
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeArchiveModal = () => {
    setShowModalArchive(false);
  };

  const closeTransactModal = () => {
    setShowModalTransact(false);
  };

  const handleArchive = async (bizId) => {
    const result = await archiveBiz(bizId); 
    if (result.success) {
      setBusinesses(businesses.map(biz => {
        if (biz._id === bizId) return { ...biz, isArchived: true };
        return biz;
      }));
    } else {
    }
    closeArchiveModal();
  };

  async function loadBusinesses() {
    const bizData = await getMyVendorManagerBizNess();
    if (bizData && !bizData.error) {
      setBusinesses(bizData.httpMessage);
      setIsLoading(false);
      setTotalBusinesses(bizData.httpMessage.length);
  
      const withImagesCount = bizData.httpMessage.filter(biz => biz.biz_images && biz.biz_images.length > 0).length;
      setNumberOfBizWithImages(withImagesCount);
  
      const activeBusinessesCount = bizData.httpMessage.filter(biz => !biz.isArchived).length;
      const inactiveBusinessesCount = bizData.httpMessage.filter(biz => biz.isArchived).length;
      setActiveBusinesses(activeBusinessesCount);
      setInactiveBusinesses(inactiveBusinessesCount);
  
      // Load transactions for all businesses
      const transactionsData = await Promise.all(
        bizData.httpMessage.map(biz => retrieveAllTransaction(adminToken, biz._id))
      );
      const transactionsMap = {};
      bizData.httpMessage.forEach((biz, index) => {
        transactionsMap[biz._id] = transactionsData[index];
      });
      setTransactions(transactionsMap);

    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    const loadBusinesses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      setAdminToken(token);
      const bizData = await getMyVendorManagerBizNess();
      if (bizData && !bizData.error) {
        setBusinesses(bizData.httpMessage);
        setIsLoading(false);
        setTotalBusinesses(bizData.httpMessage.length);
  
        const withImagesCount = bizData.httpMessage.filter(biz => biz.biz_images && biz.biz_images.length > 0).length;
        setNumberOfBizWithImages(withImagesCount);
  
        const activeBusinessesCount = bizData.httpMessage.filter(biz => !biz.isArchived).length;
        const inactiveBusinessesCount = bizData.httpMessage.filter(biz => biz.isArchived).length;
        setActiveBusinesses(activeBusinessesCount);
        setInactiveBusinesses(inactiveBusinessesCount);
      } else {
        navigate('/login');
      }
    };
  
    loadBusinesses(); 
  }, [navigate]);
  
  const handleUpload = useCallback((file) => {
    if (!file) return;
    closeModal();
  }, [closeModal]);

  const refreshBusinessData = async () => {
    await loadBusinesses(); 
  };

  const handleUploadSuccess = useCallback((bizId, updatedBizImages) => {
    setBusinesses(currentBusinesses =>
      currentBusinesses.map(biz => 
        biz._id === bizId ? { ...biz, biz_images: updatedBizImages } : biz
      )
    );
  }, [businesses]);

  useEffect(() => {
    loadBusinesses();
  }, []);
  
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
                      {user.vendorName ? user.vendorName : "This is all your added biz-ness!"}
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
          <Dropdown onSelect={handleItemsPerPageChange}>
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

        <div className="table-responsive">
          <Accordion defaultActiveKey="0">
            {displayedBusinesses.map((biz, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>
                  {biz.name}
                </Accordion.Header>                 
                <Accordion.Body>

                    <ListGroup defaultActiveKey="#link1" className='py-2'>
                      <ListGroup.Item action href="#link1">
                        <span style={{ fontWeight: 'bold' }}>Biz-ness ID: </span> {biz._id}
                      </ListGroup.Item>
                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Status: </span>
                        <span style={{ fontWeight: 'bold', color: biz.isArchived ? 'red' : 'green' }}>
                          {biz.isArchived ? "Archived" : "Active"}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Name: </span> {biz.name}
                      </ListGroup.Item>
                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Alias: </span> {biz.alias}
                      </ListGroup.Item>

                      {biz.image_url && (
                        <ListGroup.Item action disabled>
                          <span style={{ fontWeight: 'bold' }}>Photo URL: </span>  {biz.image_url}
                        </ListGroup.Item>
                      )}

                      {biz.biz_images && biz.biz_images.length > 0 ? (
                        <ListGroup.Item action disabled>
                          {biz.biz_images.slice(-3).reverse().map((image, index) => (
                            <img key={index} src={image.url} alt={`Image ${index + 1} of ${biz.name}`} style={{ width: "120px", marginLeft: index !== 0 ? "5px" : "0px" }}/>
                          ))}
                        </ListGroup.Item>
                      ) : (
                        <span className="ms-2 my-2"><span style={{ fontWeight: 'bold' }}>Photo URL: </span> No image available</span>
                      )}

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Phone Number: </span> {biz.display_phone}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Location: </span> {`${biz.location.address1}, ${biz.location.city}`}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Category: </span> {biz.categories.map(cat => cat.title).join(', ')}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                       <span style={{ fontWeight: 'bold' }}>Type of Transactions: </span> {biz.transactions.join(', ')}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Rating: </span>  {biz.rating !== null && biz.rating !== undefined ? biz.rating : <em>None available</em>}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Review Count: </span> {biz.review_count || "None available"}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Created On: </span> 
                        {formatDate(biz.createdAt)}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Updated Last: </span> 
                        {formatDate(biz.updatedAt)}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Agent UserID: </span> {biz.userID}
                      </ListGroup.Item>

                      <ListGroup.Item action disabled>
                        <span style={{ fontWeight: 'bold' }}>Agent fullName: </span> {fullNames[biz._id] || 'Loading...'}
                      </ListGroup.Item>

                    </ListGroup>

                    {transactions[biz._id] && transactions[biz._id].length > 0 && (
                      <>
                        <h3>Transaction Updates:</h3>
                        {transactions[biz._id]
                          .slice(0, visibleTransactions[biz._id] ? transactions[biz._id].length : 3)
                          .map((transaction, index) => (
                            <div className='my-lg-2' key={index}>
                              <Card>
                                <Card.Body>
                                  <span style={{ fontWeight: 'bold' }}>Agent Name:</span> {transaction.agentName} <br />       
                                  <span style={{ fontWeight: 'bold' }}>Transaction for:</span> {transaction.bizName} <br />      
                                  <span style={{ fontWeight: 'bold' }}>Biz-ness Id:</span> {transaction.bizId} <br />       
                                  <span style={{ fontWeight: 'bold' }}>Contact Person:</span> {transaction.contactEmail} <br />                                                     
                                  <span style={{ fontWeight: 'bold' }}>Package Acquired:</span> {transaction.packageAcquired} <br />   
                                  <span style={{ fontWeight: 'bold' }}>Package Amount:</span> {transaction.value} <br />                                                                                                       
                                  <span style={{ fontWeight: 'bold' }}>Transaction Made:</span> {formatDate(transaction.transactionDate)} <br />
                                  <span style={{ fontWeight: 'bold' }}>Status:</span> 
                                  <span style={getStatusStyle(transaction.status)}> {transaction.status}</span> <br />   
                                  <span style={{ fontWeight: 'bold' }}>AgentID:</span> {transaction.agentUserId} <br />                
                                  <span style={{ fontWeight: 'bold' }}>Agent Name:</span> {transaction.agentName} <br />    
                                  <span style={{ fontWeight: 'bold' }}>Agent Name:</span> {transaction.agentName} <br />                                                                                                     
                                                                                                 
                                </Card.Body>
                              </Card>
                            </div>
                        ))}
                        {transactions[biz._id].length > 3 && !visibleTransactions[biz._id] && (
                          <div className="text-center">
                            <Button variant="link" style={{ textDecoration: 'none', color: 'black' }} onClick={() => setVisibleTransactions(prev => ({ ...prev, [biz._id]: true }))}>
                              See More
                            </Button>
                          </div>
                        )}
                        {visibleTransactions[biz._id] && (
                          <div className="text-center">
                            <Button variant="link" style={{ textDecoration: 'none', color: 'black' }} onClick={() => setVisibleTransactions(prev => ({ ...prev, [biz._id]: false }))}>
                              See Less
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  <div className="d-flex justify-content-between align-items-center">
                  {/* Left side: Text */}
                  <div className="ms-2">
                    <Link 
                      // to={`/admin-dashboard/${adminID}/see-biz/${bizID}`} 
                      // to={`/admin-dashboard/adminID/see-biz/bizID`} 
                      style={{ textDecoration: 'underline', color: 'orange' }}
                    >
                      <p>View Biz Status</p>
                    </Link>
                  </div>


                  <div className="d-flex align-items-center">

                    <Dropdown className="mx-1">
                      <Dropdown.Toggle variant="info" id="dropdown-payment-status">
                        Payment Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Header>Successful Payments</Dropdown.Header>
                        <Dropdown.Item href="#/action-1">✅ Paid</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">💸 Refunded</Dropdown.Item>

                        <Dropdown.Header>Payment Issues</Dropdown.Header>
                        <Dropdown.Item href="#/action-2">❌ Failed</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">🔄 Chargeback</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">🚫 Cancelled</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">🔒 Blocked</Dropdown.Item>

                        <Dropdown.Header>Visibility Status</Dropdown.Header>
                        <Dropdown.Item href="#/action-3">🙈 Not Visible</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mx-1">
                      <Dropdown.Toggle variant="secondary" id="dropdown-biz-status">
                        Biz Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Header>Communication Status</Dropdown.Header>
                        <Dropdown.Item href="#/action-1" title="Business requirement message has been sent">
                          <span role="img" aria-label="envelope">📩</span> Sent Business Requirement Message
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" title="Already in communication with the business">
                          <span role="img" aria-label="chat">💬</span> Already in Communication
                        </Dropdown.Item>

                        <Dropdown.Header>Development Status</Dropdown.Header>
                        <Dropdown.Item href="#/action-3" title="Business is already under development">
                          <span role="img" aria-label="hammer">🔨</span> Business Under Development
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-4" title="Business has already been deployed">
                          <span role="img" aria-label="rocket">🚀</span> Business Deployed
                        </Dropdown.Item>

                        <Dropdown.Header>Response Status</Dropdown.Header>
                        <Dropdown.Item href="#/action-5" title="Business is not responding">
                          <span role="img" aria-label="no-response">🛑</span> Business Not Responding
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button className="mx-1" variant="success" onClick={() => openTransactModal(biz._id, biz.alias)}>
                      Transact Biz
                    </Button>

                    <Button className="mx-1" variant="warning" onClick={() => openModal(biz._id, biz.alias)}>
                      Upload Biz Image
                    </Button>

                    {!biz.isArchived && (
                      <Button variant="danger" onClick={() => openArchiveModal(biz._id)} className="mx-1">
                        Archive Biz
                      </Button>
                    )}
                  </div>
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
            onRefreshBusinesses={refreshBusinessData}
            bizID={currentBizId} 
            adminId={adminId}
            bizName={currentBizName}
          />

          <ArchiveBizModal 
            show={showModalArchive} 
            handleClose={closeArchiveModal} 
            handleArchive={handleArchive}
            bizID={currentBizId}
          />

          <TransactModal 
              show={showModalTransact} 
              handleClose={closeTransactModal} 
              onUploadSuccess={handleUploadSuccess} 
              onRefreshBusinesses={refreshBusinessData}
              onTransactionComplete={handleTransactionComplete}
              bizID={currentBizId} 
              adminId={adminId}
              bizName={currentBizName}
          />
        </div>

      </Container>
      <AppFooter />
    </>
  );
}
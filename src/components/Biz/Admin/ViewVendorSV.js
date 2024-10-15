import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Accordion, Button, Pagination, Dropdown, ListGroup } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { getMyVendorManagerBizNess, archiveBiz } from '../../../utils/Biz/BizUtils.js';
import { retrieveAllTransaction } from '../../../utils/Biz/AdminUtils.js';
import { returnFullName } from '../../../utils/Biz/UserUtils.js';
import Footer from '../Shared/Footer/MainFooter.js';
import UploadImageModal from './UploadImage.js';
import ArchiveBizModal from './Modal/ArchivedBizModal.js';
import TransactModal from './Modal/TransactModal.js';
import userIcon from '../../../assets/icons/icon-round-image.png';
import '../../../assets/styles/AccountInfo.css';
import { Link } from 'react-router-dom';
import UserContext from '../../../utils/Contexts/userContext.js';
import ProcessedAccounts from './Table/RetrieveBizSV.js';

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

  // useEffect(() => {
  //   // Fetch full names for all businesses
  //   displayedBusinesses.forEach(biz => {
  //     if (biz.userID && !fullNames[biz._id]) {
  //       fetchFullName(biz.userID, biz._id);
  //     }
  //   });
  // }, [displayedBusinesses]);
  

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
        
      </div>

        <div>
          <ProcessedAccounts/>
        </div>

      </Container>
      <Footer />
    </>
  );
}

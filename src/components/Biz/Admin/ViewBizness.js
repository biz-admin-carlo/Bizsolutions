import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Accordion, Button, Pagination, Dropdown, ListGroup } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { getMyCreatedBiz, archiveBiz } from '../../../utils/Biz/BizUtils.js';
import { retrieveTransaction } from '../../../utils/Biz/AdminUtils.js';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import Footer from '../Shared/Footer/MainFooter.js';
import UploadImageModal from './UploadImage.js';
import ArchiveBizModal from './Modal/ArchivedBizModal.js';
import TransactModal from './Modal/TransactModal.js';
import userIcon from '../../../assets/icons/icon-round-image.png';
import '../../../assets/styles/AccountInfo.css';
import * as XLSX from 'xlsx';
import RetrieveBizAgent from './Table/RetrieveBizAgent.js';

import UserContext from '../../../utils/Contexts/userContext.js';

export default function SeeBizNez() {

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
  
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

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

    if (!transactions[bizId] || transactions[bizId].length === 0) {
      const fetchedTransactions = await retrieveTransaction(adminToken, bizId);
      setTransactions(prev => ({ ...prev, [bizId]: fetchedTransactions }));
    }
  };

  const handleTransactionComplete = async () => {
    if (currentBizId) {
        const updatedTransactions = await retrieveTransaction(adminToken, currentBizId);
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

  const generateSpreadsheet = () => {
    const sheetSize = 100; // Number of businesses per sheet
    const sheets = Math.ceil(businesses.length / sheetSize); // Total number of sheets
  
    const workbook = XLSX.utils.book_new(); // Create a new workbook

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString(); // This will format as "MM/DD/YYYY, HH:MM:SS AM/PM"
    };
  
    for (let i = 0; i < sheets; i++) {
      const start = i * sheetSize;
      const end = start + sheetSize;
      const sheetBusinesses = businesses.slice(start, end); // Get up to 100 businesses for this sheet
  
      // Prepare the business data for the spreadsheet, including a number column
      const data = sheetBusinesses.map((biz, index) => ({
        Number: start + index + 1, // Add a number column to track the business number
        Name: biz.name,
        Alias: biz.alias,
        Status: biz.isArchived ? 'Archived' : 'Active',
        Phone: biz.display_phone,
        Location: `${biz.location.address1}, ${biz.location.city}`,
        Rating: biz.rating || 'N/A',
        ReviewCount: biz.review_count || 'N/A',
        CreatedAt: formatDate(biz.createdAt),
        UpdatedAt: formatDate(biz.updatedAt),
      }));
  
      // Create a new worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Calculate the max width of each column and auto-size
      const columnWidths = data.reduce((widths, row) => {
        Object.keys(row).forEach((key, index) => {
          const valueLength = row[key] ? row[key].toString().length : 10; // Default to 10 if empty
          if (!widths[index]) {
            widths[index] = valueLength;
          } else {
            widths[index] = Math.max(widths[index], valueLength);
          }
        });
        return widths;
      }, []);
  
      // Set the worksheet column widths
      worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));
  
      // Add the worksheet to the workbook, name it "Businesses 1", "Businesses 2", etc.
      XLSX.utils.book_append_sheet(workbook, worksheet, `Businesses ${i + 1}`);
    }
  
    // Get the current date and format it as YYYYMMDD
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD
  
    // Generate a download for the file with the format YYYYMMDD_BizSolutions-Bizs.xlsx
    const fileName = `${formattedDate}_BizSolutions-Bizs.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  async function loadBusinesses() {
    const bizData = await getMyCreatedBiz();
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
        bizData.httpMessage.map(biz => retrieveTransaction(adminToken, biz._id))
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
    async function loadBusinesses() {
      const bizData = await getMyCreatedBiz();
      if (bizData && !bizData.error) {
        setBusinesses(bizData.httpMessage);
        setIsLoading(false);
        setTotalBusinesses(bizData.httpMessage.length);
  
        const withImagesCount = bizData.httpMessage.filter(biz => biz.biz_images && biz.biz_images.length > 0).length;
        setNumberOfBizWithImages(withImagesCount);
  
        const activeBusinesses = bizData.httpMessage.filter(biz => !biz.isArchived).length;
        const inactiveBusinesses = bizData.httpMessage.filter(biz => biz.isArchived).length;
        setActiveBusinesses(activeBusinesses);
        setInactiveBusinesses(inactiveBusinesses);
      } else {
        navigate('/login');
      }
    }
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

      <RetrieveBizAgent />

      </Container>
      <Footer />
    </>
  );
}

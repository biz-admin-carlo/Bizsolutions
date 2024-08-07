import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, Accordion, Button, Pagination, Dropdown } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { getMyCreatedBiz, archiveBiz } from '../../utils/Biz/BizUtils.js';
import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';
import UploadImageModal from './Admin_UploadBizImage.js';
import ArchiveBizModal from './Admin_ArchiveBizModal.js';
import userIcon from '../../assets/Biz/icons/icon-round-image.png';
import '../../assets/Biz/styles/AccountInfo.css';
import { Link } from 'react-router-dom';

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
  const [ numberOfBizWithImages, setNumberOfBizWithImages ] = useState(0);
  const [ showModalArchive, setShowModalArchive ] = useState(false);
  const [ currentBizId, setCurrentBizId ] = useState(null);
  const [ adminId, setAdminId ] = useState(null);
  const [ activeBusinesses, setActiveBusinesses ] = useState(0);
  const [ inactiveBusinesses, setInactiveBusinesses ] = useState(0);
  const [ currentBizName, setCurrentBizName ] = useState('');

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
                      {user.referralCode ? (
                        user.referralCode
                      ) : (
                        <Link to="/account#referral-code">Get your Referral Code now!</Link>
                      )}
                    </Card.Subtitle>
                </div>

              </div>
        </div>
      <hr/>

      </Container>
      <AppFooter />
    </>
  );
}

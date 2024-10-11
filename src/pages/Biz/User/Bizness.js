import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'
import HomeModal from '../../../components/Biz/Home/Modal.js';
import Landing from '../../../components/Biz/Biz/Landing.js';
import { checkUserBiz, retrieveUserBiz } from '../../../utils/Biz/BizUtils.js';
import UserContext from '../../../utils/Contexts/userContext.js';

export default function Bizness() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isSmallScreen, setIsSmallScreen ] = useState(window.innerWidth < 768);
  const [ hasBusiness, setHasBusiness ] = useState(false);
  const [ businessData, setBusinessData ] = useState([]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    async function fetchBusinessData() {
      const hasBiz = await checkUserBiz();
      setHasBusiness(hasBiz);
      const data = await retrieveUserBiz();
      setBusinessData(data);
    }

    fetchBusinessData();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
          <Helmet>
            <title>BizSolutions | Biz</title>
          </Helmet>

          {!isSmallScreen && <div data-aos="fade-up"><HomeModal /></div>}
              <div data-aos="fade-up">
                <Landing businessData={businessData} hasBusiness={hasBusiness} />
              </div>  
          <Footer />
        </>
      )}
    </div>

  );
}

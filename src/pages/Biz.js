import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.js';
import AppFooter from '../components/Application_Footer.js';
import HomeLanding from '../components/Home_Landing.js'
import HomeModal from '../components/Home_Modal.js';
import HomeTestimony from '../components/Home_Testimony.js';
import HomeNumbers from '../components/Home_Numbers.js';
import BizLanding from '../components/Biz_Landing.js';
import BizRegistration from '../components/Biz_Registration.js';

export default function Biz() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
          {!isSmallScreen && <div data-aos="fade-up"><HomeModal /></div>}
            <div data-aos="fade-up"><BizLanding /></div>
          <AppFooter />
        </>
      )}
    </div>

  );
}

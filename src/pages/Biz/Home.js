import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.js';
import SectionA from '../../components/Biz/Home_SectionA.js';
import SectionB from '../../components/Biz/Home_SectionB.js';
import SectionC from '../../components/Biz/Home_SectionC.js';
import SectionD from '../../components/Biz/Home_SectionD.js';
import SectionE from '../../components/Biz/Home_SectionE.js';
import SectionF from '../../components/Biz/Home_SectionF.js';
import SectionG from '../../components/Biz/Home_SectionG.js';
import SectionH from '../../components/Biz/Home_SectionH.js';
import SectionFooter from '../../components/Biz/Application_Footer';

export default function Home() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
            <div data-aos="fade-up"><SectionA /></div>
            <div data-aos="fade-up"><SectionB /></div>
            <div data-aos="fade-up"><SectionC /></div> 
            <div data-aos="fade-up"><SectionD /></div>
            <div data-aos="fade-up"><SectionE /></div>
            <div data-aos="fade-up"><SectionF /></div>
            <div data-aos="fade-up"><SectionG /></div>
            <div data-aos="fade-up"><SectionH /></div>
          <SectionFooter />
        </>
      )}
    </div>

  );
}

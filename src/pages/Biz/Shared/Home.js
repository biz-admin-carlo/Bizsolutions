import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../utils/Contexts/userContext.js';
import SectionA from '../../../components/Biz/Home/SectionA.js';
import SectionB from '../../../components/Biz/Home/SectionB.js';
import SectionC from '../../../components/Biz/Home/SectionC.js';
import SectionD from '../../../components/Biz/Home/SectionD.js';
import SectionE from '../../../components/Biz/Home/SectionE.js';
import SectionF from '../../../components/Biz/Home/SectionF.js';
import SectionG from '../../../components/Biz/Home/SectionG.js';
import SectionI from '../../../components/Biz/Home/SectionI.js';
import SectionH from '../../../components/Biz/Home/SectionH.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

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
            <div data-aos="fade-up"><SectionI /></div>
          <Footer />
        </>
      )}
    </div>

  );
}

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.js';
import SectionG from '../../components/Biz/Home_SectionG.js';
import SectionFooter from '../../components/Biz/Application_Footer';

export default function Search() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
            <div data-aos="fade-up"><SectionG /></div>
            <SectionFooter />
        </>
      )}
    </div>

  );
}

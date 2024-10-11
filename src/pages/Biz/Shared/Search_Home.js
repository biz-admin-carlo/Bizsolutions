import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../utils/Contexts/userContext.js';
import SectionA from '../../../components/Biz/Search/SectionA.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

export default function Search() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
            <div data-aos="fade-up"><SectionA /></div>
            <Footer />
        </>
      )}
    </div>

  );
}

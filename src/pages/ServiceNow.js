import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import UserContext from '../UserContext.js';
import AppFooter from '../components/Application_Footer.js';
import HomeModal from '../components/Home_Modal.js';
import ServiceLanding from '../components/Service_Landing.js';
import { retrieveTeamDetails } from '../utils/BizUtils.js';

export default function ServiceNow() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [ isSmallScreen, setIsSmallScreen ] = useState(window.innerWidth < 768);
  const [ retrieveTeams, setRetrieveTeams ] = useState([]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    async function checkTeamAvailability() {
      const hasTeam = await retrieveTeamDetails();
      setRetrieveTeams(hasTeam);
    }

    checkTeamAvailability();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
          <Helmet>
            <title>BizSolutions | Service</title>
          </Helmet>

          {!isSmallScreen && <div data-aos="fade-up"><HomeModal /></div>}
              <div data-aos="fade-up">
                <ServiceLanding retrieveTeams={retrieveTeams}/>
              </div>  
          <AppFooter />
        </>
      )}
    </div>

  );
}

import { Helmet } from 'react-helmet'; 
import SignUp from '../../components/Biz/Signup_Interface.js';
import AppFooter from '../../components/Biz/Application_Footer.js';

export default function Signup() {

  return (
    <>
      <Helmet>
        <title>BizSolutions | Sign Up</title>
      </Helmet>
        <div data-aos="fade-up"><SignUp /></div>
      <AppFooter />
    </>
  )
}
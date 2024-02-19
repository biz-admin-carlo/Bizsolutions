import { Helmet } from 'react-helmet'; 
import SignUp from '../components/Signup_Interface.js';
import AppFooter from '../components/AppFooter';

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
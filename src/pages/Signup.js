import SignUp from '../components/SignUp.js';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../components/AppFooter';

export default function NewSignUp() {

  return (
    <>
      <Helmet>
        <title>BizSolutions | Sign Up</title>
      </Helmet>

      <SignUp />
      <AppFooter />
    </>
  )
}
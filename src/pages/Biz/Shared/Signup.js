import { Helmet } from 'react-helmet'; 
import SignUp from '../../../components/Biz/SignUp/Signup.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

export default function Signup() {

  return (
    <>
      <Helmet>
        <title>BizSolutions | Sign Up</title>
      </Helmet>
        <div data-aos="fade-up"><SignUp /></div>
      <Footer />
    </>
  )
}
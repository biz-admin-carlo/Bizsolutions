import { Container, Navbar, Button } from 'react-bootstrap';

import '../../assets/Biz/styles/AppFooter.css';

export default function Cookies({ onConsent }) {
  return (
    <>
      <Navbar className="app-footer" fixed="bottom">
        <Container className="py-3 px-4 me-5">
          <h6 className="my-3 me-3">By continuing to browse the site you agree to our use of cookies. Click here to <a href="/privacy" style={{color: '#FF851A', textDecoration: 'none' }}>learn more</a>.</h6>
          <Button variant="outline-dark" className='button-section' onClick={onConsent}>I Agree</Button>
        </Container>
      </Navbar>
    </>
  );
}

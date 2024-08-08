import { Container, Navbar, Button } from 'react-bootstrap';
import '../../assets/Biz/styles/Cookies.css';

export default function Cookies({ onConsent }) {
  return (
    <Navbar className="app-cookies" fixed="bottom">
      <Container className="py-3 px-4 d-flex align-items-center justify-content-between">
        <h6 className="text-consent mb-0">By continuing to browse the site you agree to our use of cookies. Click here to <a href="/privacy" className="learn-more">learn more</a>.</h6>
        <Button variant="outline-dark" className="button-agree w-100" onClick={onConsent}>I Agree</Button>
      </Container>
    </Navbar>
  );
}

import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../assets/styles/AppFooter.css';


export default function AppFooter() {
  return (
    <Navbar className="app-footer pb-0 my-2">
      <Container>
        <Navbar.Text className="me-auto footer-links d-sm-block d-none">
          <Link to="/terms" className="no-underline">Terms </Link>
          |
          <Link to="/privacy" className="no-underline"> Privacy </Link>
        </Navbar.Text>
        <Navbar.Text className="ms-md-auto text-left">
          © {new Date().getFullYear()} All Rights Reserved. Bizsolutions LLC.
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

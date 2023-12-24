import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <Navbar className="pb-0">
         <Navbar.Brand as={Link} to="/about"> 
          About Bizsolutions LLC
        </Navbar.Brand>
          <Navbar.Text className="ms-auto">
            © {new Date().getFullYear()} All Rights Reserved. Bizsolutions LLC. 
          </Navbar.Text>
    </Navbar>
  )
}

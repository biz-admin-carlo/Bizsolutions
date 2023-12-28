import { useState, Suspense } from 'react';
import { UserProvider } from './UserContext';

import AppNavbar from './components/AppNavbar';
import ScrollToTop from './components/ScrollToTop';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
  
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <ScrollToTop />
          <AppNavbar />
          <Container />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                </Routes>
              </Suspense>
            <Container />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
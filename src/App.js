import { useState, Suspense } from 'react';
import { UserProvider } from './UserContext';

import AppNavbar from './components/AppNavbar';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Search from './pages/Search';
import Account from './pages/Account';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Check from './components/CheckButton';
import LoginPricing from './components/LoginPricing';
import ScrollToTop from './components/ScrollToTop';

function App() {
  
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null,
    details: {}
  });

  const unsetUser = () => {
    sessionStorage.clear();
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
                    <Route path="/login/pricing" element={<LoginPricing/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/pricing" element={<Pricing/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/privacy" element={<Privacy/>}/>

                </Routes>
              </Suspense>
            <Container />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
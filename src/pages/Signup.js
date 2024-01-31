import '../assets/styles/AppLanding.css'
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import BarSpinner from '../components/BarSpinner';
import SignUp from '../components/SignUp.js';
import AppFooter from '../components/AppFooter';

const apiUrl = process.env.REACT_APP_API_URL;

export default function NewSignUp() {

  return (
    <>
      <SignUp />
      <AppFooter />
    </>
  )
}
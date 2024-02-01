import React from 'react';
import { Container } from 'react-bootstrap';
import Typings from './Typings.js';
import imgOne from '../assets/img-landing-one.png';
import '../assets/styles/AppInformation.css';

export default function LandingOne() {
    return (
        <div className='pt-lg-3'>
            <Container className='py-5'>

                    <h1 className='sm-center'>Biz is the Perfect Plan For You</h1>
                    <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>

                    <div className="image-section">
                    <Typings />
                        <img className="py-lg-2 img-fluid" src={imgOne} alt="Web Application" />
                    </div>

                    <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>

                <hr />
            </Container>
        </div>
    );
}
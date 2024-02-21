import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Typings from './Pricing_TypingsEffect.js'

const Pricing_Landing = () => {
    const [ loadVideo, setLoadVideo ] = useState(false);

    useEffect(() => {
        setLoadVideo(true);
    }, []);

    return (
        <Container className='py-5'>
                <div className="content-container d-flex align-items-center pb-lg-5">
                    <div className="text-section">
                        <h1 className='pt-lg-4 sm-center'>Unlock Your Business's Full Potential with Biz</h1>
                                <Typings />

                                <hr />
                            <p className="pt-2 pb-lg-3 sm-center">In today's fast-paced business environment, having the right partner can make all the difference.</p>
                            <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                            <p className="pt-2 pb-lg-3 sm-center">That's where "Biz" comes in. Tailored to meet the unique needs of your business, "Biz" is more than just a plan; it's your pathway to success. Discover why "Biz" is the perfect choice for entrepreneurs who demand excellence and innovation.</p>
                            <hr />
                                <p className='paragraph-2 text-center'>No Large Setup Fee. No Ridiculous Contracts. No Hidden Charges. 100% Satisfaction Guaranteed.</p>
                            <hr />
                    </div>

                    <div className="content-container">
                        {loadVideo && (
                            <a href="https://www.youtube.com/shorts/XcoLWjWWh7g" target="_blank" rel="noopener noreferrer">
                                <video width="320" height="240" className="img-fluid" autoPlay loop>
                                    <source src={require('../assets/video-are-you-ready-stock.mp4')} type="video/mp4" />
                                </video>
                            </a>
                        )}
                    </div>
                </div>

                <hr />
            </Container>
    );
};

export default Pricing_Landing;

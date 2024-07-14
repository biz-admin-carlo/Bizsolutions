import React, { useState, useEffect } from 'react';
import '../../assets/Biz/styles/CustomerSupport.css';
import stockVideo from '../../assets/Biz/videos/video-stock-landing.mp4';
console.log(stockVideo);

const HomeLanding = () => {

    const taglines = [
        'of website innovation.',
        'of digital makeovers.',
        'of SEO mastery.',
        'of financial accuracy.',
        'of tech solutions.',
        'of customer connections.',
        'of strategic sales.',
        'of business analytics.'
    ];

    const [ currentTagline, setCurrentTagline ] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTagline((currentTagline + 1) % taglines.length); // Cycle through taglines
        }, 2000); // Change tagline every 2 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [currentTagline]);

    return (
        <>
            <div className="section-container-video my-3 d-none d-lg-block">
                <video autoPlay loop muted playsInline className="video-background">
                    <source src={stockVideo} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <div className="flex-row">
                    <div className="flex-col-video">
                        <h1 className='title-brilliance pe-5'>
                                Discover the Secret to Success
                        </h1>
                        <h1 className='title-secondary'>{taglines[currentTagline]}</h1>
                    </div>
                </div>
            </div>

            {/* <div className="section-container-video my-3">
                <video autoPlay loop muted playsInline className="video-background">
                    <source src={stockVideo} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <div className="flex-row">
                    <div className="flex-col-video">
                        <h1 className='title-brilliance px-5 ms-5'>
                                Behind the brilliance
                        </h1>
                        <h1 className='title-secondary px-5 ms-5'>{taglines[currentTagline]}</h1>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default HomeLanding;
import React, { useState, useEffect } from 'react';
import '../../assets/Biz/styles/CustomerSupport.css';
import stockVideo from '../../assets/Biz/videos/video-stock-landing.mp4';

const SectionA = () => {

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
            setCurrentTagline((currentTagline + 1) % taglines.length); 
        }, 2000);

        return () => clearInterval(intervalId);
    }, [currentTagline]);

    return (
        <>
            <div className="section-container-video my-3">
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
        </>
    );
};

export default SectionA;
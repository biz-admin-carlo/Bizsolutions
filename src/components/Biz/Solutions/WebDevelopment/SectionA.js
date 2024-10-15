import React from 'react';
import { Helmet } from 'react-helmet'; 

const WebDevelopmentSectionA = () => {

    return ( 
        <Helmet>
            <title>BizSolutions | Website Development</title>
            <meta name="description" content="Discover innovative website development services at BizSolutions. Our team excels in creating cutting-edge, user-friendly websites that drive digital success." />
            
            <meta property="og:title" content="BizSolutions | Website Development" />
            <meta property="og:description" content="Discover innovative website development services at BizSolutions. Our team excels in creating cutting-edge, user-friendly websites that drive digital success." />
            <meta property="og:image" content="https://mybizsolutions.us/static/media/icon-website-development.123abcd456efg.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://mybizsolutions.us/website-development-services" />
            
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="BizSolutions | Website Development" />
            <meta name="twitter:description" content="Discover innovative website development services at BizSolutions. Our team excels in creating cutting-edge, user-friendly websites that drive digital success." />
            <meta name="twitter:image" content="https://mybizsolutions.us/static/media/icon-website-development.123abcd456efg.jpg" />
            
            <link rel="canonical" href="https://mybizsolutions.us/website-development-services" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            
            <meta name="keywords" content="website development, web design, BizSolutions web services, digital success, user-friendly websites, cutting-edge technology, web solutions" />

            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "BizSolutions | Website Development",
                    "description": "Discover innovative website development services at BizSolutions. Our team excels in creating cutting-edge, user-friendly websites that drive digital success.",
                    "url": "https://mybizsolutions.us/website-development-services",
                    "image": "https://mybizsolutions.us/static/media/icon-website-development.123abcd456efg.jpg",
                    "publisher": {
                    "@type": "Organization",
                    "name": "BizSolutions",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://mybizsolutions.us/static/media/bizsolutions-logo.123abcd456efg.jpg"
                    }
                    }
                }
                `}
            </script>
        </Helmet>

    );
};

export default WebDevelopmentSectionA;
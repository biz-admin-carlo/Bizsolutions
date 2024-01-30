import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from './useCountingEffect';
import '../assets/styles/AppInformation.css';

export default function BundleExpert() {

    const featureList = [
        { 
            title: "Priority Business Listing", 
            features: [
                { name: "Business Profile", color: "green" },
                { name: "Contact Information", color: "green" },
                { name: "Physical Address", color: "green" },
                { name: "Store Hours & Availability", color: "green" },
                { name: "Map Integration", color: "green" },
                { name: "Different Payment Methods", color: "green" },
                { name: "Links to Your Other Sites", color: "green" },
                { name: "Embeded Videos", color: "green" },
                { name: "Photo Gallery", color: "green" },
            ]
        },
        { 
            title: "Local Website", 
            features: [
                { name: "Unlimited Pages*", color: "orange" },
                { name: "30 Custom Business Emails", color: "orange" },
                { name: "Responsive design", color: "green" },
                { name: "Social Media Links", color: "green" },
                { name: "Advanced Search Engine Optimization (SEO)", color: "orange" },
                { name: "Hosting with Custom Domain", color: "orange" },
                { name: "Ongoing Maintenance and Support", color: "orange" },
                { name: "Directory Submissions", color: "orange" },
                { name: "Premium Security Measures", color: "orange" },
                { name: "Comprehensive E-Commerce Solutions", color: "orange" },
                { name: "Integrated Payment Processing System", color: "orange" },
            ]
        },
        { 
            title: "Social Media Management", 
            features: [
                { name: "Facebook Account", color: "orange" },
                { name: "X Account", color: "orange" },
                { name: "Instagram Account", color: "orange" },
                { name: "Tiktok Account", color: "orange" },
                { name: "Automated Ads", color: "orange" },
            ]
        },
    ];

    return (
        <Card className='card-shadow'>
            <Card.Body>
                <Card.Title>Expert Setup</Card.Title>
                <h3 className='card-text-amount'>
                    Let's Talk!<p>chat with us <Badge pill bg="warning" text="dark"> email@mail.com </Badge></p>
                </h3>
                <Card.Subtitle className="mb-2 text-muted">Custom Solutions for Peak Potential</Card.Subtitle>
                <Button variant="outline-warning" className='my-3 full-width-button'>Get Started</Button>
                <Card.Text> Features included: </Card.Text>
                
                {featureList.map((section, index) => (
                    <div key={index}>
                        <h6>{section.title}</h6>
                        <div className='pb-5'>
                            {section.features.map((feature, featureIndex) => (
                                <IconContext.Provider key={featureIndex} value={{ color: feature.color, className: "me-2" }}>
                                    <div><GoCheckCircleFill />{feature.name}</div>
                                </IconContext.Provider>
                            ))}
                        </div>
                    </div>
                ))}

                <div>
                    <div className='italic-text'>*This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
                </div>
            </Card.Body>
        </Card>
    );
}

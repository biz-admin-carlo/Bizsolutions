import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import '../../assets/styles/SearchResult.css';

export default function SearchResult() {
    return (
        <Container>
            <div className='orange-background p-5'>
                {/* Visible on medium and large screens */}
                <div className='p-3 d-none d-md-block'>
                    <NavLink to="/home" className="text-result-link">
                        <h1 className='text-result'>BizSolutions</h1>
                    </NavLink>
                    <h4 className='text-tagline'>Your Partner for your Business Needs</h4>
                </div>

                {/* Visible on small screens */}
                <div className='d-block d-md-none'>
                    <NavLink to="/home" className="text-result-link">
                        <h1 className='text-result-sm'>BizSolutions</h1>
                    </NavLink>
                    <h4 className='text-tagline'>Your Partner for your Business Needs</h4>
                </div>
            </div>
        </Container>
    );
}

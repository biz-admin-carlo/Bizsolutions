import React from 'react';
import { Container } from 'react-bootstrap';
import { FaCheckCircle } from "react-icons/fa";

import '../../assets/Biz/styles/BookkeepingHome.css';

const Failed = () => {

    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block pt-lg-5">
                <div className="flex-row pt-lg-5">
                    <div className="flex-col content-col mx-3 text-center pt-lg-5">
                        <FaCheckCircle style={{ color: '#FF851A', fontSize: '50px' }} />

                        <hr />
                        <h1 className="text-center">Failed Payment!</h1>
                        <p>A confirmation email has been sent to your address.</p>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Failed;
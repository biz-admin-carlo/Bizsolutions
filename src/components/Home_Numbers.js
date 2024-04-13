import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/NumbersHome.css';
import useTypingEffect from './Home_TypingEffect';


const Numbers = () => {
    const count1 = useTypingEffect(6000);
    const count2 = useTypingEffect(2000);
    const count3 = useTypingEffect(1000);

    return (
        <Container className="my-5 text-center">
            <div className="landing-container-numbers py-5">
                <h3 className="numbers-text">Here at BizSolutions we are currently provides this service to our loyal customers:</h3>
                <div className="numbers-flex">
                    <div className="numbers-section">
                        <h2 className="numbers-text-digits">{count1}+</h2>
                        <p className="numbers-text">Web Service</p>
                    </div>
                    <span className="divider"></span>
                    <div className="numbers-section">
                        <h2 className="numbers-text-digits">{count2}+</h2>
                        <p className="numbers-text">Bookkeeping Service</p>
                    </div>
                    <span className="divider"></span>
                    <div className="numbers-section">
                        <h2 className="numbers-text-digits">{count3}+</h2>
                        <p className="numbers-text">Payroll Service</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Numbers;


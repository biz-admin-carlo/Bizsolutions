import React from 'react';
import { Container } from 'react-bootstrap';
import useTypingEffect from './Home_TypingEffect';
import '../../assets/Biz/styles/HomeSectionH.css';


const HomeSectionH = () => {
    const count1 = useTypingEffect(7999, 8000);
    const count2 = useTypingEffect(2999, 8000);
    const count3 = useTypingEffect(1999, 8000);
    const count4 = useTypingEffect(899, 8000);

    return (
        <>
            <Container className="my-5 text-center">
                <div className="landing-container-numbers py-5">
                    <h3 className="numbers-text">Here at <span className='biz-color-white'> BizSolutions </span> we are currently provides this service to our loyal customers!</h3>
                    <div className="numbers-flex pt-lg-5">
                        <div className="numbers-section">
                            <h2 className="numbers-text-digits">{count1}+</h2>
                            <p className="numbers-text biz-color-white">Website Development Services</p>
                        </div>
                        <span className="divider"></span>
                        <div className="numbers-section">
                            <h2 className="numbers-text-digits">{count2}+</h2>
                            <p className="numbers-text biz-color-white">Bookkeeping Services</p>
                        </div>
                        <span className="divider"></span>
                        <div className="numbers-section">
                            <h2 className="numbers-text-digits">{count3}+</h2>
                            <p className="numbers-text biz-color-white">Payroll Services</p>
                        </div>
                        <span className="divider"></span>
                        <div className="numbers-section">
                            <h2 className="numbers-text-digits">{count4}+</h2>
                            <p className="numbers-text biz-color-white">Website Revamp Services</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>


        
    );
};

export default HomeSectionH;
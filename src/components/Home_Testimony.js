import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web from '../assets/img-testimonies.png';
import '../assets/styles/TechnicalHome.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        quote: "Exceptional Service! Truly Top Tier!!",
        detail: "Working with BizSolutions has been a remarkable journey. Their dedication and professionalism are unparalleled. Excited for more collaborative projects ahead!",
        author: "Mike S., Entrepreneur, California"
    },
    {
        quote: "Streamlined and Efficient! A Game Changer for My Business!",
        detail: "Discovering the web app service from BizSolutions was a breakthrough for my business. The user-friendly interface and innovative features have simplified complex processes, saving me time and boosting productivity. Their support team is always on point, providing quick and helpful responses. I'm looking forward to seeing how they continue to evolve and improve our workflows.",
        author: "Jane R., Small Business Owner, New York"
    },
    {
        quote: "A Lifesaver in Bookkeeping!",
        detail: "BizSolutions' bookkeeping is top-notch. Their attention to detail keeps my finances precise and current. I'm particularly impressed by how their system integrates with our operations, offering essential real-time insights. Highly recommend for anyone seeking dependable bookkeeping.",
        author: "Ali T., Tech Startup CEO, Texas"
    }
];

const TestimonialBlock = ({ quote, detail, author }) => (
    <figure className="text-center">
        <blockquote className="blockquote">
            <h6 className='fw-bold' style={{ color: '#FF851A', fontStyle: 'italic' }}>{quote}</h6>
            <p>{detail}</p>
        </blockquote>
        <figcaption className="blockquote-footer pt-3">
            <strong className="fst-italic">{author}</strong>
        </figcaption>
    </figure>
);

const TestimonialsCarousel = ({ testimonials }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
                <div key={index}>
                    <TestimonialBlock {...testimonial} />
                </div>
            ))}
        </Slider>
    );
};

const Testimony = () => {
    return (
        <>
            <Container className="landing-container my-3">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center biz-color'><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Client Success Stories at BizSolutions</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            At BizSolutions, we're committed to listening and adapting to our clients' needs. Your feedback is our most valuable asset. Discover the experiences and success stories of our clients.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="BizSolutions LLC Testimonies from Previous Projects" />
                    </div>
                </div>
                <div className="flex-col py-lg-5">
                    {/* {testimonials.map((testimonial, index) => (
                        <TestimonialBlock key={index} {...testimonial} />
                    ))} */}
                    <TestimonialsCarousel testimonials={testimonials} />
                </div>
            </Container>
        </>
    );
};

export default Testimony;

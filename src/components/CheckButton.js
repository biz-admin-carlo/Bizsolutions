import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function TextExample() {
  return (
    <>
    <Container>
        <div>
            <Card className='py-3 my-5'>
                <Card.Body>
                    <Card.Title>Empowering Your Business Success: Comprehensive Solutions Tailored for You</Card.Title>
                      <Card.Subtitle className="my-2">At BizSolutions LLC, we specialize in driving growth and efficiency for businesses of all sizes. Our suite of services is designed to address your diverse needs in the digital and customer engagement spheres.
                        <ul className='my-3'>
                            <li>Website Development: Unlock the potential of your online presence with our cutting-edge website development services. We craft responsive, user-friendly, and visually stunning websites that not only attract visitors but convert them into loyal customers.</li>
                            <li>Bookkeeping: Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.</li>
                            <li>Technical and IT Support: Navigate the complexities of technology with ease. Our technical and IT support services are here to resolve your tech challenges promptly, ensuring your operations run smoothly without any disruptions.</li>
                            <li>Customer Service Support (Chat, Email, and Phone): Enhance your customer relationships with our comprehensive support solutions. Whether through chat, email, or phone, our team delivers exceptional service, ensuring every interaction with your customers is a positive and satisfying experience.</li>
                            <li>Sales and Collections: Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.</li>
                        </ul>
                      Partner with us and experience a seamless journey towards business excellence. We’re more than a service provider; we’re your strategic ally in growth and success.
                      </Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    </Container>
    </>
  );
}

export default TextExample;
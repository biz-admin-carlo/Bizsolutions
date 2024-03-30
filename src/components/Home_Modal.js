import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Home_Modal() {
    const [show, setShow] = useState(true); 

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (!show) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://forms.keap.app/lib/public-form-embed.js?appId=dyb285&version=1.1.0';
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
            if (window.keapForms) {
                window.keapForms.renderAllForms();
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <div data-form-slug="7778106060873627" data-env="production" data-path="contact-us/7778106060873627" className="keap-custom-form"></div>
        </Modal>
    );
}

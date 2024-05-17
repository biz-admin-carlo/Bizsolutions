import React from 'react';
import Alert from 'react-bootstrap/Alert';
import '../assets/styles/SuccessBox.css';

export default function SuccessBox() {
    return (
        <div>
            <Alert variant='light'>
                <p className='box-message my-2'>Business Created Successfully!</p>
            </Alert>
        </div>
    );
}
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import '../assets/styles/SuccessBox.css';

export default function Failure() {
    return (
        <div>
            <Alert variant='light'>
                <p className='box-message-red my-2'>Business Creation Failed. Please check the provided data and try again.</p>
            </Alert>
        </div>
    );
}
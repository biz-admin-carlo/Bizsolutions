import React from 'react';
import { Alert } from 'react-bootstrap';
import '../../../../assets/styles/SuccessBox.css';

export default function FailureBox({ message = "Operation failed. Please check the provided data and try again." }) {
    return (
        <div>
            <Alert variant='light'>
                <p className='box-message-red my-2'>{message}</p>
            </Alert>
        </div>
    );
}

import React from 'react';
import { Alert } from 'react-bootstrap';
import '../../../../assets/styles/SuccessBox.css';

export default function SuccessBox({ message = "Operation completed successfully!" }) {
    return (
        <div>
            <Alert variant='light'>
                <p className='box-message my-2'>{message}</p>
            </Alert>
        </div>
    );
}

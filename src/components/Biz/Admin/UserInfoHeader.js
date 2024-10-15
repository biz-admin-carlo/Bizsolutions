import React from 'react';
import { Card } from 'react-bootstrap';
import { IoRefreshCircle } from "react-icons/io5";
import userIcon from '../../../assets/icons/icon-round-image.png';

export default function UserInfoHeader({ user, onRefresh }) {
  return (
    <div className='user-info-container' style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '3rem' }}>
      <img src={userIcon} alt="MyBiz Solutions User's Default Image" width={50} height={50} className='mx-3'/> 
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h6 className="responsive-title">
            Hello, {user.firstName} {user.lastName}!
          </h6>
          <Card.Subtitle className='text-secondary'>
            {user.vendorName ? user.vendorName : "This is all your added biz-ness!"}
          </Card.Subtitle>
        </div>
        <IoRefreshCircle 
          style={{ fontSize: '44px', color: 'green', cursor: 'pointer' }} 
          onClick={onRefresh}  
        />       
      </div>
    </div>
  );
}
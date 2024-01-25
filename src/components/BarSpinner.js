import React from 'react';
import { Bars } from 'react-loader-spinner';

const BarSpinner = ({ isVisible }) => {

    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backdropFilter: 'blur(5px)', 
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        zIndex: 9999 
      };

  return (
    <div style={loaderStyle}>
        <Bars
        height="100"
        width="100"
        color="#FF851A"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isVisible}
        />
    </div>
  );
};

export default BarSpinner;

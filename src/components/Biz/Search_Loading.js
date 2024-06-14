import React from 'react'; 
import '../../assets/Biz/styles/Search_Loading.css';


export default function LoadingResult() {

    const loaderStyle = {
        width: '60px',
        aspectRatio: '2',
        background: 'no-repeat radial-gradient(circle closest-side, #000 90%, #0000)',
        backgroundSize: 'calc(100% / 3) 50%',
        animation: 'l3 1s infinite linear',
        backgroundPosition: '0% 50%, 50% 50%, 100% 50%'
    };

    
    return (
        <div className="loader" style={loaderStyle}></div>
    );
}

import React, { useEffect, useRef } from 'react';
import { init } from 'ityped';

import '../assets/styles/AppInfo1.css';

const AppInfo1 = () => {
  const textRef = useRef();

  useEffect(() => {
        init(textRef.current, { 
        showCursor: true, 
        strings: ['BizSolutions could be for you'], 
        backDelay: 1500,
        backSpeed: 60,
    });
}, []);


  return (
    <div className="app-info">
      <h1 ref={textRef}></h1>
    </div>
  );
};

export default AppInfo1;

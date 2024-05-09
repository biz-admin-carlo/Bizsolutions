import { useState, useEffect } from 'react';

const useTypingEffect = (targetValue, duration = 5000, resetDependency) => { 

    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(0); 
        const endValue = parseInt(targetValue, 10);
        const frameRate = 50;
        const numUpdates = duration / frameRate;
        const stepSize = Math.ceil(endValue / numUpdates);
        let currentNumber = 0;

        const timer = setInterval(() => {
            currentNumber += stepSize;
            if (currentNumber >= endValue) {
                clearInterval(timer);
                setValue(endValue);
            } else {
                setValue(currentNumber);
            }
        }, frameRate);

        return () => clearInterval(timer);
    }, [targetValue, duration, resetDependency]);

    return value;
};

export default useTypingEffect;

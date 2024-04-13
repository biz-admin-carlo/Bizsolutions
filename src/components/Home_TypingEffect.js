import { useState, useEffect } from 'react';

const useTypingEffect = (targetValue, duration = 2000) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const startValue = 0;
        const endValue = parseInt(targetValue, 10);
        // Adjust the frame rate to 50ms for a slower update
        const frameRate = 50; 
        const numUpdates = duration / frameRate;
        const stepSize = Math.ceil(endValue / numUpdates);
        let currentNumber = startValue;

        const timer = setInterval(() => {
            currentNumber += stepSize;
            if (currentNumber >= endValue) {
                clearInterval(timer);
                setValue(endValue);
            } else {
                setValue(currentNumber);
            }
        }, frameRate); // Update every 50ms instead of 20ms

        return () => clearInterval(timer);
    }, [targetValue, duration]);

    return value;
};

export default useTypingEffect;

import { useState, useEffect } from 'react';

const useTypingEffect = (targetValue, duration = 2000, resetDependency) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(0); // Reset value to 0 to re-trigger animation from 0
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
    }, [targetValue, duration, resetDependency]); // Add a reset dependency that changes to force rerun

    return value;
};

export default useTypingEffect;

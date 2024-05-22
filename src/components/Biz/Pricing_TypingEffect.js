import { useState, useEffect } from 'react';

const useCountingEffect = (targetValue, duration = 500) => {
  const [value, setValue] = useState(targetValue);

  useEffect(() => {
    let startValue = parseFloat(value) || 0;
    const endValue = parseFloat(targetValue);

    if (startValue === endValue) {
      setValue(targetValue); // Directly set the value if it's already at target
      return;
    }

    const step = (endValue - startValue) / (duration / 10); // Control the increment/decrement step
    let intervalId;

    intervalId = setInterval(() => {
      startValue += step;
      
      // Stop and set to target value when reached or exceeded
      if ((step > 0 && startValue >= endValue) || (step < 0 && startValue <= endValue)) {
        setValue(endValue.toFixed(2));
        clearInterval(intervalId);
      } else {
        setValue(startValue.toFixed(2));
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [targetValue, duration]);

  return value;
};

export default useCountingEffect;

import React, { useEffect, useState } from 'react';

const Timer = ({ seconds, onEnd, setTimeLeft }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTimeLeft(time);

    if (time === 0) {
      onEnd();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onEnd, setTimeLeft]);

  return (
    <div className="mb-4 text-lg font-medium text-gray-700">
      Time Left: <span className="text-red-500 font-bold">{time}s</span>
    </div>
  );
};

export default Timer;
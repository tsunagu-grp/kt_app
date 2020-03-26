import React, {useEffect, useState} from 'react';
import Clock from '../components/Clock';

const ShowClock: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const nextTiming = 1000 - (Date.now() % 1000);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDate(new Date());
    }, nextTiming);
    return () => {
      clearTimeout(timer);
    };
  }, [date, nextTiming]);
  return <Clock date={date} />;
};

export default ShowClock;

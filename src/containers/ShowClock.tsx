import React, {useEffect, useState} from 'react';
import Clock from '../components/Clock';
import {Props} from '../types/ShowClock.types';

const ShowClock: React.FC<Props> = ({initialDate}) => {
  const [date, setDate] = useState(initialDate);
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

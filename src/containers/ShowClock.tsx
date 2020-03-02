import React,{useState,useEffect} from 'react';
import Clock from '../components/Clock'

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

  return (
    <Clock year={date.getFullYear()} month={date.getMonth()+1} day={date.getDate()} hour={date.getHours()} minute={date.getMinutes()} second={date.getSeconds()} weekDay={date.getDay()}  />
  );
}

export default ShowClock;
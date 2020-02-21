import React,{useState,useEffect} from 'react';
import Clock from '../components/Clock'

const ShowClock: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(()=>{
    setInterval(()=>{setDate(new Date());
    },1000)
  },[date])

  return (
    <Clock year={date.getFullYear()} month={date.getMonth()+1} day={date.getDate()} hour={date.getHours()} minute={date.getMinutes()} second={date.getSeconds()} weekDay={date.getDay()}  />
  );
}

export default ShowClock;
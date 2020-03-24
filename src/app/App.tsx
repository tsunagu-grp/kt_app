import React,{useState,useEffect} from 'react';
import './App.css';
import ShowClock from '../containers/ShowClock'
import Calendar from '../containers/Calendar'
import '../styles/tailwind.css';
import {getYear,getMonth,getDay,getDateFrom,getDateTo} from '../util/date'

const App: React.FC = () => {
  const initialDate = new Date();
  const [date, setDate] = useState(initialDate);
  const nextTiming = 1000 - (Date.now() % 1000);

  const yaer = getYear(date);
      const month = getMonth(date);
      const day = getDay(date);
      const dateFrom = getDateFrom(yaer + '-' + month + '-' + day);
      const dateTo = getDateTo(yaer + '-' + month + '-' + day);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDate(new Date());
    }, nextTiming);
    return () => {
      clearTimeout(timer);
    };
  }, [date, nextTiming]);

  return (
    <>
      <ShowClock date={date} />
      <Calendar dateFrom={dateFrom} dateTo={dateTo} />
    </>
  );
}

export default App;

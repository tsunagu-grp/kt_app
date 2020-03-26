import './App.css';
import '../styles/tailwind.css';
import React, {useEffect, useState} from 'react';
import Calendar from '../containers/Calendar';
import ShowClock from '../containers/ShowClock';
import {getDateFrom, getDateTo, getDay, getMonth, getYear} from '../util/date';

const App: React.FC = () => {
  const initialDate = new Date();
  const [date, setDate] = useState(initialDate);
  const nextTiming = 1000 - (Date.now() % 1000);

  const yaer = getYear(date);
  const month = getMonth(date);
  const day = getDay(date);
  const dateFrom = getDateFrom(`${yaer}-${month}-${day}`);
  const dateTo = getDateTo(`${yaer}-${month}-${day}`);

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
};

export default App;

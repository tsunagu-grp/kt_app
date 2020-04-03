import './App.css';
import '../styles/tailwind.css';
import React from 'react';
import ShowClock from '../containers/ShowClock';
import ShowTask from '../containers/ShowTask';
import {getDateFrom, getDateTo, getDay, getMonth, getYear} from '../util/date';

const App: React.FC = () => {
  const date = new Date();
  const yaer = getYear(date);
  const month = getMonth(date);
  const day = getDay(date);
  const dateFrom = getDateFrom(`${yaer}-${month}-${day}`);
  const dateTo = getDateTo(`${yaer}-${month}-${day}`);

  return (
    <>
      <ShowClock initialDate={date} />
      <ShowTask
        dateFrom={dateFrom}
        dateTo={dateTo}
        today={`${yaer}-${month}-${day}`}
      />
    </>
  );
};

export default App;

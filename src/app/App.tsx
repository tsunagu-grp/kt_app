import './App.css';
import '../styles/tailwind.css';
import React from 'react';
import ShowClock from '../containers/ShowClock';
import ShowTask from '../containers/ShowTask';
import {getDay, getMonth, getYear} from '../util/date';

const App: React.FC = () => {
  const date = new Date();
  const yaer = getYear(date);
  const month = getMonth(date);
  const day = getDay(date);

  return (
    <>
      <ShowClock initialDate={date} />
      <ShowTask today={`${yaer}-${month}-${day}`} />
    </>
  );
};

export default App;

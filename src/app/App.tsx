import React from 'react';
import './App.css';
import ShowClock from '../containers/ShowClock'
import Calendar from '../containers/Calendar'
import '../styles/tailwind.css';

const App: React.FC = () => {
  return (
    <div>
    <ShowClock />
    <Calendar />
    </div>
  );
}

export default App;

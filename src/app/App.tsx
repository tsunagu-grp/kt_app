import './App.css';
import '../styles/tailwind.css';
import React from 'react';
import ShowClock from '../containers/ShowClock';
import ShowTask from '../containers/ShowTask';

const App: React.FC = () => {
  return (
    <>
      <ShowClock />
      <ShowTask />
    </>
  );
};

export default App;

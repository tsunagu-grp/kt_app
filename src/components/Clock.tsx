import React from 'react';
import {Props} from '../types/Clock.types';
import {
  getDay,
  getHour,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from '../util/date';

const Clock: React.FC<Props> = ({date}) => {
  return (
    <div className="App flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center text-6xl">
          <span>{getYear(date)}年</span>
          <span>{getMonth(date)}月</span>
          <span>{getDay(date)}日</span>
        </div>
        <div className="flex justify-center text-7xl">
          <span>{getHour(date)}:</span>
          <span>{getMinutes(date)}:</span>
          <span>{getSeconds(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;

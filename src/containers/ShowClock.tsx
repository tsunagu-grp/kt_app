import React from 'react';
import Clock from '../components/Clock'

const ShowClock: React.FC = () => {
  // 現在日時を取得
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const weekDay = date.getDay();

  return (
    <Clock year={year} month={month} day={day} hour={hour} minute={minute} second={second} weekDay={weekDay}  />
  );
}

export default ShowClock;
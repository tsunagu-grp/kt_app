import React from 'react';
import {Props} from '../types/Clock.types'
import '../styles/tailwind.css';

const Clock: React.FC<Props> = ({year,month,day,hour,minute,second,weekDay}) => {
  return (
    <div className="App">
      <div className='flex justify-center'>
        <span>{year}年</span>
        <span>{('0' + month).slice(-2)}月</span>
        <span>{('0' + day).slice(-2)}日</span>
      </div>
      <div className='flex justify-center'>
        <span>{('0' + hour).slice(-2)}時</span>
        <span>{('0' + minute).slice(-2)}分</span>
        <span>{('0' + second).slice(-2)}秒</span>
        <span>{['日','月','火','水','木','金','土'][weekDay]}</span>
      </div>
    </div>
  );
}

export default Clock;
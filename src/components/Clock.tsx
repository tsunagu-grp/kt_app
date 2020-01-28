import React from 'react';
import {Props} from '../types/Clock.types'

const Clock: React.FC<Props> = ({year,month,day,hour,minute,second,weekDay}) => {
  return (
    <div className="App">
      {year}
      <br />
      {month}
      <br />
      {day}
      <br />
      {hour}
      <br />
      {minute}
      <br />
      {second}
      <br />
      {weekDay}
    </div>
  );
}

export default Clock;
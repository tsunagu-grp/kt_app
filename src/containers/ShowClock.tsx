import React from 'react';
import Clock from '../components/Clock'
import {Props} from '../types/ShowClock.types'

const ShowClock: React.FC<Props> = ({date}) => {
  return (
    <Clock date={date}  />
  );
}

export default ShowClock;
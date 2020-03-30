import React from 'react';
import {Props} from '../types/Task.types';

const Task: React.FC<Props> = ({summary, startDate, startTime}) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg mx-6 my-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {summary}
          <p>{startDate}</p>
          <p>{startTime}</p>
        </div>
        <p className="text-gray-700 text-base"></p>
      </div>
    </div>
  );
};

export default Task;

import React from 'react';
import {Props} from '../types/TaskButton.types';

const TaskButton: React.FC<Props> = ({onClick}) => {
  return (
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-base"
        onClick={onClick}
      >
        signin
      </button>
    </div>
  );
};

export default TaskButton;

import React from 'react';
import {Props} from '../types/Clock.types'

const Clock: React.FC<Props> = ({year,month,day,hour,minute,second,weekDay}) => {
  return (
    <div className="App flex justify-center items-center h-screen">
      <div>
        <div className='flex justify-center text-6xl'>
          <span>{year}年</span>
          <span>{('0' + month).slice(-2)}月</span>
          <span>{('0' + day).slice(-2)}日</span>
        </div>
        <div className='flex justify-center text-7xl'>
          <span>{('0' + hour).slice(-2)}:</span>
          <span>{('0' + minute).slice(-2)}:</span>
          <span>{('0' + second).slice(-2)}</span>
          {/* <span>{['日','月','火','水','木','金','土'][weekDay]}</span> */}
        </div>
        <div className="w-full rounded overflow-hidden shadow-lg mx-6 my-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">ペアプロ<time>{new Date().getTime()}</time></div>
            <p className="text-gray-700 text-base">
              electron！
            </p>
          </div>
        </div>
        <div className="w-full rounded overflow-hidden shadow-lg mx-6 my-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">ペアプロ<time>{new Date().getTime()}</time></div>
            <p className="text-gray-700 text-base">
              electron！
            </p>
          </div>
        </div>
        <div className="w-full rounded overflow-hidden shadow-lg mx-6 my-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">ペアプロ<time>{new Date().getTime()}</time></div>
            <p className="text-gray-700 text-base">
              electron！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
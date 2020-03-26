import React, {useEffect, useState} from 'react';
import {initClient} from '../api';
import Task from '../components/Task';
import {Events} from '../types/ShowTask.types';

const ShowTask: React.FC = () => {
  const [events, setEvents] = useState<Events>([]);

  useEffect(() => {
    (async () => {
      setEvents(await initClient());
    })();
  }, []);
  return (
    <>
      {events.map((val, key) => (
        <Task summary={val.summary} start={val.start.dateTime} key={key} />
      ))}
    </>
  );
};

export default ShowTask;

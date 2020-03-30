import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {initClient} from '../api';
import Task from '../components/Task';
import {Events, Props} from '../types/ShowTask.types';
dayjs.locale('ja');
const ShowTask: React.FC<Props> = ({dateFrom, dateTo}) => {
  const [events, setEvents] = useState<Events>([]);

  useEffect(() => {
    (async () => {
      setEvents(await initClient({dateFrom, dateTo}));
    })();
  }, [dateFrom, dateTo]);

  return (
    <>
      {events.map((val, key) => (
        <Task
          summary={val.summary}
          startDate={dayjs(val.start.dateTime).format('YYYY-MM-DD(dd)')}
          startTime={dayjs(val.start.dateTime).format('HH:mm:ss')}
          key={key}
        />
      ))}
    </>
  );
};

export default ShowTask;

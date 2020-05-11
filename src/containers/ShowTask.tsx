import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import Task from '../components/Task';
import TaskButton from '../components/TaskButton';
import {Events, Props} from '../types/ShowTask.types';
import {calendarEvents} from '../types/ShowTask.types';
const electron = window.require('electron');

dayjs.locale('ja');
const ShowTask: React.FC<Props> = ({today}) => {
  const [events, setEvents] = useState<Events>([]);
  const [signed, setSigned] = useState<boolean>(false);

  const ipcRenderer = electron.ipcRenderer;

  const getEvents = async () => {
    ipcRenderer.send('signin', 'hogehoge');
    ipcRenderer.on('reply', (_: any, data: any) => {
      const response: calendarEvents = data.items;
      const eventsList = response
        .filter(el => (el.start.date || today) === today)
        .map(val => {
          const [startDate, startTime] =
            val.start.dateTime !== undefined
              ? [
                  dayjs(val.start.dateTime).format('YYYY-MM-DD(dd)'),
                  dayjs(val.start.dateTime).format('HH:mm:ss'),
                ]
              : [dayjs(val.start.date).format('YYYY-MM-DD(dd)'), '終日'];
          return {
            summary: val.summary,
            startDate: startDate,
            startTime: startTime,
          };
        });
      setEvents(eventsList);
      setSigned(true);
    });
  };

  return (
    <>
      {signed ? (
        events.map((val, key) => (
          <Task
            summary={val.summary}
            startDate={val.startDate}
            startTime={val.startTime}
            key={key}
          />
        ))
      ) : (
        <TaskButton onClick={getEvents} />
      )}
    </>
  );
};

export default ShowTask;

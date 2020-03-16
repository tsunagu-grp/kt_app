import React, { useEffect } from 'react';
import dayjs from 'dayjs';

const Calendar: React.FC = () => {

  const initClient = () => {
    gapi.client.init({
      clientId: '334809568162-vl9nn803jdobffhv35lg80r3b7or2mqf.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(function () {
      gapi.auth2.getAuthInstance().signIn();
      const date = new Date();
      const yaer = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const targetDate = yaer + '-' + month + '-' + day;
      const dateFrom = dayjs(targetDate + 'T00:00:00.000Z').toISOString()
      const dateTo = dayjs(targetDate + 'T23:59:59.999Z').toISOString()
      const restRequest = gapi.client.request({
        'path': `https://www.googleapis.com/calendar/v3/calendars/skawadu@geek.co.jp/events?timeMin=${dateFrom}&timeMax=${dateTo}`
      });
      restRequest.execute((events) => {
        console.dir(events);
      });
    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  }

  useEffect(()=>{
    gapi.load('client:auth2', initClient)
  })
  return <p>Calendar</p>
}

export default Calendar;
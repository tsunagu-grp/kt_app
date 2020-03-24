import React, { useEffect,useCallback } from 'react';
import {Props} from '../types/Calendar.types'

const Calendar: React.FC<Props> = ({dateFrom,dateTo}) => {

  const initClient = useCallback(() => {
    gapi.client.init({
      clientId: '334809568162-vl9nn803jdobffhv35lg80r3b7or2mqf.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(function () {
      gapi.auth2.getAuthInstance().signIn();
      const restRequest = gapi.client.request({
        'path': `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${dateFrom}&timeMax=${dateTo}`
      });
      restRequest.execute((events) => {
        console.dir(events);
      });
    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  },[dateFrom, dateTo])

  useEffect(()=>{
    gapi.load('client:auth2', initClient)
  },[initClient])

  return <p>Calendar</p>
}

export default Calendar;
import React, { useEffect,useCallback } from 'react';
import {Props} from '../types/Calendar.types'
require('dotenv').config({ path: __dirname + '/../.env' });

const Calendar: React.FC<Props> = ({dateFrom,dateTo}) => {

  const clientId = process.env.REACT_APP_CLIENTID;
  const discoveryDocs = process.env.REACT_APP_DISCOVERYDOCS;
  const scope = process.env.REACT_APP_SCOPE;
  const path = process.env.REACT_APP_PATH;

  const initClient = useCallback(() => {
    gapi.client.init({
      clientId: clientId,
      discoveryDocs: [discoveryDocs ? discoveryDocs:''],
      scope: scope
    }).then(function () {
      gapi.auth2.getAuthInstance().signIn();
      const restRequest = gapi.client.request({
        'path': `${path}?timeMin=${dateFrom}&timeMax=${dateTo}`
      });
      restRequest.execute((events) => {
        console.dir(events);
      });
    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  },[clientId, dateFrom, dateTo, discoveryDocs, path, scope])

  useEffect(()=>{
    gapi.load('client:auth2', initClient)
  },[initClient])

  return <p>Calendar</p>
}

export default Calendar;
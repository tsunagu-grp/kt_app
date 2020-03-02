import React, { useEffect } from 'react';

const Calendar: React.FC = () => {
  useEffect(()=>{
    // gapi.load('client:auth2', () => {
    //   gapi.client.init({
    //     clientId: '1073500525202-72i0b6tb59aum2dm3jjbj8rtiu7qrn8i.apps.googleusercontent.com',
    //     scope: 'https://www.googleapis.com/auth/calendar.readonly'
    //   }).then(() => {
    //     const auth = gapi.auth2.getAuthInstance();
    //     console.log(auth);
    //   });
    // });
  })
  return <p>Calendar</p>
}

export default Calendar;
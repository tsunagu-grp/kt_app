import dotenv from 'dotenv';
import {Events} from '../types/ShowTask.types';
import {getDateFrom, getDateTo, getDay, getMonth, getYear} from '../util/date';

dotenv.config({path: __dirname + '/../.env'});

const clientId = process.env.REACT_APP_CLIENTID;
const discoveryDocs = process.env.REACT_APP_DISCOVERYDOCS;
const scope = process.env.REACT_APP_SCOPE;
const path = process.env.REACT_APP_PATH;

const date = new Date();
const yaer = getYear(date);
const month = getMonth(date);
const day = getDay(date);
const dateFrom = getDateFrom(`${yaer}-${month}-${day}`);
const dateTo = getDateTo(`${yaer}-${month}-${day}`);

export const initClient = () => {
  return new Promise<Events>(resolve => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          clientId: clientId,
          discoveryDocs: [discoveryDocs ? discoveryDocs : ''],
          scope: scope,
        })
        .then(
          () => {
            gapi.auth2.getAuthInstance().signIn();
            const restRequest = gapi.client.request({
              path: `${path}?timeMin=${dateFrom}&timeMax=${dateTo}`,
            });
            restRequest.execute((res: any) => {
              resolve(res.items);
            });
          },
          error => {
            console.log(JSON.stringify(error, null, 2));
          },
        );
    });
  });
};

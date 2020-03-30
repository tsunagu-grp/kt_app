import dotenv from 'dotenv';
import {Events, Props} from '../types/ShowTask.types';

export const initClient = (props: Props) => {
  dotenv.config({path: __dirname + '/../.env'});
  const clientId = process.env.REACT_APP_CLIENTID;
  const discoveryDocs = process.env.REACT_APP_DISCOVERYDOCS;
  const scope = process.env.REACT_APP_SCOPE;
  const path = process.env.REACT_APP_PATH;
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
              path: `${path}?timeMin=${props.dateFrom}&timeMax=${props.dateTo}`,
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

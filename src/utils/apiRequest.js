import * as request from 'superagent';
export function apiRequest(data, type, url, callBack) {
  console.log(url);
  request[type](url)
    .send(data)
    .set('token', localStorage.getItem('token'))
    .set('Accept', 'application/json')
    .end(function(res, result) {
      console.log(result);
      console.log(data);
      if (result) {
          return callBack(result.body);
      }
      return callBack();
    });
}

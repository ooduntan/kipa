import * as request from 'superagent';
export function apiRequest(data, type, url, callBack) {
  request[type](url)
    .send(data)
    .set('token', localStorage.getItem('token'))
    .set('Accept', 'application/json')
    .end(function(res, result) {
      if (result) {
        return callBack(result.body);
      }

      return callBack(result);
    });
}

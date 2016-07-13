import * as request from 'superagent';

export function postRequest(data, url, callBack) {
  request
    .post(url)
    .send(data)
    .set('X-API-Key', 'token')
    .set('Accept', 'application/json')
    .end(function(res, result) {
      return callBack(result.body);
    });
}

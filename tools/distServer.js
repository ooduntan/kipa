import express from 'express';
import path from 'path';
import open from 'open';
import {
  api
} from '../api/index';

/* eslint-disable no-console */

const port = process.env.PORT;
const app = express();

app.use(api);
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

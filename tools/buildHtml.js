import fs from 'fs';
import colors from 'colors';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (err, markUp) => {
  if(err) {
    console.log(err, 'read error');
  }

  const $ = cheerio.load(markUp);

  $('head').prepend('<link rel="stylesheet" href="styles.css"/>');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if(err) {
      return console.log(err, 'write error');
    }

    console.log('Index.html written to /dist'.green);
  });
});
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'

console.log('Generating minified bundle for production via webpack this will take some time');

webpack(webpackConfig).run((error, stats) => {
  if(error) {
    console.log(error.bold.red);
    return 1;
  }

  const jsonState = stats.toJson();

  if(jsonState.hasErrors) {
    return jsonState.errors.map(errors => {console.log(errors.red)});
  }

  if(jsonState.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    return jsonState.warnings.map(warning => {console.log(warning.yellow)});
  }

  console.log(`Webpack stats : ${stats}`);

  console.log('The app has been compiled in production mode and written to /dist. it is ready to roll'.green);
  
  return 0;
});
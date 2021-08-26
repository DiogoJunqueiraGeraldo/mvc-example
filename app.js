const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const config = require('./config/config');
const db = require('./config/db');

process.env.VIEWS = path.join(__dirname, 'app/views')

app.use(bodyParser.json({ json: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// bootstrap routes
require('./app/routes')(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line no-param-reassign
  res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.on('connected', () => {
  app.listen(config.server.port, config.server.hostname, () => {
    console.log(`App listening on ${config.server.hostname} port: ${config.server.port}`);
    app.emit('appStarted');
  });
});

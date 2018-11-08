const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const addRoutes      = require('./routes');
const { db }         = require('./model');
const fillDbDefault  = require('./defaultDb');
const config         = require('./package.json').config;
const moment         = require('moment');
const port = 8000;
const AUTH_TOKEN_HEADER = 'AuthToken'
const ALLOWED_HEADERS = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  AUTH_TOKEN_HEADER
].join(',')

app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  next();
});

app.use((req, res, next) => {
  if (!config.enableAuthorization || req.originalUrl.endsWith('/auth') || req.originalUrl.endsWith('/signUp')) {
    next();
    return;
  }

  // OPTIONS request means preflight request. Don't check token for it.
  let isPreflight = res.req.method === 'OPTIONS';
  if (isPreflight) {
    next();
    return;
  }
  
  const token = req.headers[AUTH_TOKEN_HEADER]
    || req.headers[AUTH_TOKEN_HEADER.toLowerCase()];
  const foundSession = db
    .get('authSessions')
    .find({ token })
    .value();

  const isTokenExpired = foundSession
    && moment(foundSession.expirationDate).unix() > moment().unix()

  if (!token || !foundSession || isTokenExpired) {
    res.status(401).send({
      status: isTokenExpired ? 'Expired token' : 'Unauthorized'
    });
    return;
  }

  next();
});

addRoutes(app);

// Set some defaults (required if your JSON file is empty)
fillDbDefault(db);

app.listen(port, () => {
  console.log('We are live on ' + port);
});

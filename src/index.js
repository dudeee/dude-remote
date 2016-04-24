import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { defaultsDeep } from 'lodash';


const DEFAULT_CONFIG = {
  server: {
    hostname: '127.0.0.1',
    port: 3000
  },
  auth: {
    key: 'token',
    value: '123',
  },
  cookiesMaxAge: 3600
};

export default bot => {
  // express application
  const app = bot.remote = express(); // eslint-disable-line
  const config = defaultsDeep(bot.config.remote, DEFAULT_CONFIG);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // cookieParser with signed cookie (use auth token value as secret)
  app.use(cookieParser(config.auth.value, {
    maxAge: config.cookiesMaxAge
  }));

  // authorize user
  app.use((req, res, next) => {
    const { key, value } = config.auth;
    const token = req.query[key] || req.cookies[key];
    if (token !== value) {
      bot.log.silly('[remote]', 'unauthorized request', key, token);
      return res.sendStatus(403);
    }
    bot.log.silly('[remote]', 'authorized request', key, token);
    res.cookie(key, value);
    return next();
  });

  app.listen(config.server.port, config.server.hostname);

  return bot;
};

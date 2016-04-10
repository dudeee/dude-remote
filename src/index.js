import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { defaultsDeep } from 'lodash';


const DEFAULT_CONFIG = {
  server: {
    hostname: '127.0.0.1',
    port: 3000
  },
  auth: {
    key: 'token',
    value: '123'
  }
};

export default async bot => {
  // express application
  const app = express();
  const config = defaultsDeep(bot.config.remote, DEFAULT_CONFIG);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // authorize user
  app.use((req, res, next) => {
    const { key, value } = config.auth;
    if (req.query[key] !== value) {
      return res.send(403);
    }
    return next();
  });

  app.listen(config.server.port, config.server.hostname);

  bot.remote = app; // eslint-disable-line
};

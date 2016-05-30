import { expect } from 'chai';
import request from 'supertest';
import remote from '../build';

const LONG_TIMEOUT = 5000;

describe('dude-remote', () => {
  let bot;
  const config = {
    remote: {
      server: {
        hostname: '127.0.0.1',
        port: 3000,
      },
      auth: {
        key: 'token',
        value: '123',
      },
    },
  };
  before(() => {
    bot = {
      config,
      log: {
        debug() {},
        silly() {},
      },
    };
    bot = remote(bot);
    bot.remote.get('/test_success', (req, res) => {
      res.sendStatus(200);
    });
  });
  describe('remote express server', function functions() {
    this.timeout(LONG_TIMEOUT);

    it('should add an express app as \'remote\' key to the bot object', done => {
      expect(bot.remote).to.include.keys('use', 'get', 'post', 'put', 'all');
      done();
    });

    it('should reject requests with a 403 error for requests without auth token', done => {
      request(bot.remote)
        .get('/test_success')
        .expect(403, done);
    });

    it('should reject requests with a 403 error for requests with invalid auth token', done => {
      request(bot.remote)
        .get(`/test_success?${config.remote.auth.key}=${config.remote.auth.value}sdasd31231`)
        .expect(403, done);
    });

    it('should accept requests with a 200 response for requests with valid auth token', done => {
      request(bot.remote)
        .get(`/test_success?${config.remote.auth.key}=${config.remote.auth.value}`)
        .expect(200, done);
    });

    it('should respond 404 for the routes that does not exist', done => {
      request(bot.remote)
        .get(`/test_404?${config.remote.auth.key}=${config.remote.auth.value}`)
        .expect(404, done);
    });
  });
});

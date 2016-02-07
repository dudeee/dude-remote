import Hapi from 'hapi';
import { promisify } from 'bluebird';


export default async bot => {
  try {
    // Get remote config file from bolt config
    const { remote: config } = bot.config;

    // Get server config from remote object
    const { server, auth } = config;

    const remote = new Hapi.Server();

    const register = promisify(remote.register.bind(remote));

    remote.connection(server);

    bot.remote = remote; // eslint-disable-line

    // Register auth plugin, define and use it if it's default
    await register({
      register: require('hapi-auth-bearer-token')
    });
    server.auth.strategy('bolt_remote_simple', 'bearer-access-token', {
      accessTokenName: auth.key,
      validateFunc(token, callback) {
        return callback(null, token === auth.token, { token });
      }
    });
    if (auth.useDefault) {
      remote.auth.default('bolt_remote_simple');
    }

    bot.remote.start(() => (
      bot.log.verbose(`bolt remote server started at ${server.host}:${server.port}`)
    ));
  } catch (e) {
    bot.log.error(`Error registering remote plugin: ${e}`);
  }
};

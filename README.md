# bolt-remote

`bolt-remote` is a remote http server plugin for [Bolt](https://github.com/slack-bolt/bolt) slack bot based on [Hapi](http://hapijs.com/) web framework. You can use this plugin to access your bots remotely with http requests.


## Installation

First install Bolt and make it work. Then use `npm` and install it:

```bash
npm install --save bolt-remote
```

## Setup

Bolt knows the plugins by their package name prefix. It's loading all `bolt-*` modules as plugin and pass them a Bolt instance. They can modify the bot or do anything else with the instance.

This plugin only needs some configuration in your Bolt `config.js` file. Make sure you have the following config structure in your bot config:

```js
export default {
  // some other config
  // .
  // .
  remote: {
    server: {
      host: '127.0.0.1',
      port: '8585'
    },
    auth: {
      key: 'access_token',
      token: 'DmO6HEvdga5OEva8CxEAZs30C5j7DPhN',
      useDefault: true
    }
  }
  // maybe some more other config here too
  // .
  // .
}
```

* **server**: The config object passed to Hapi `connection` method which can contain server, port and other options.

* **auth**: Auth configuration which used to implement a simple token based auth with following props:
  * **key** (string): Query string key for auth token string.
  * **token** (string): Our uniques and safe token to passed as value of `key` param in query string.
  * **useDefault** (boolean): Use this auth as default auth for all our routes that we will define.


## Usage

This plugin adds a `remote` property to your bolt instance. This remote property is a Hapi server instance which can be used to define routes and etc.

Read more about [Hapi](http://hapijs.com/tutorials) | [Routing](http://hapijs.com/tutorials/routing).


## Contribution

You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :heart:

Remember to lint your code before sending pull requests. Run the Grunt eslint task with the following command and fix the lint errors if you get any.

```bash
grunt eslint
```

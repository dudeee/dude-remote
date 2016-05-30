# dude-remote

`dude-remote` is a remote http server plugin for [dude](https://github.com/dudeee/dude) slack bot based on [Express](http://expressjs.com/) web framework. You can use this plugin to make awesome plugins and access your bots remotely with http requests.


## Installation

First install dude and make it work. Then use `npm` and install it:

```bash
npm install --save dude-remote
```

## Setup

Dude knows the plugins by their package name prefix. It's loading all `dude-*` modules as plugin and pass them a dude instance. They can modify the bot or do anything else with the instance.

This plugin only needs some configuration in your dude `config.js` file. Make sure you have the following config structure in your bot config:

```js
export default {
  // some other config
  // .
  // .
  remote: {
    server: {
      hostname: '127.0.0.1',
      port: 3000
    },
    auth: {
      key: 'token',
      value: 'DmO6HEvdga5OEva8CxEAZs30C5j7DPhN'
    }
  }
  // maybe some more other config here too
  // .
  // .
}
```

* **server**: The config object has 2 keys, hostname and the port. The default value is `127.0.0.7` and `3000`.

* **auth**: Auth configuration which used to implement a simple query string token based auth with following props:
  * **key** (string): Query string key for auth token string.
  * **value** (string): Our uniques and safe token to passed as value of `key` param in query string.


## Usage

This plugin adds a `remote` property to your dude instance. This remote property is a Express server instance which can be used to define routes, middlewares and etc.

Read more about [Express](http://expressjs.com/).


## Contribution

You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :heart:

Remember to lint your code before sending pull requests. Run the Grunt eslint task with the following command and fix the lint errors if you get any.

```bash
grunt eslint
```

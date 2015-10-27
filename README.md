# Servers
A ~~service~~ server registry of sort. 

[![NPM](https://nodei.co/npm/servers.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/servers/)

[![Build Status](https://travis-ci.org/ivan-loh/servers.svg?branch=master)](https://travis-ci.org/ivan-loh/servers) [![Dependencies Status](https://david-dm.org/ivan-loh/servers.svg)](https://david-dm.org/ivan-loh/servers)


Install
-------

```js
npm install -g servers
```

Usage
-----

### servers-master
Starts a registry server to store request from other clients and to inform others on the location of other servers

| Options | Description                            |
|---------|----------------------------------------|
| port    | port the server listens to for request |
| key     | Authentication key to use              |

```
servers-master --port 9999 --key test
```


### servers-client
| Options | Description                                                                                            |
|---------|--------------------------------------------------------------------------------------------------------|
| port    | port of the listening server                                                                           |
| key     | Authentication key to use                                                                              |
| host    | host address of the server                                                                             |
| name    | name of this client server, by default will try to obtain hostname of machine                          |
| mode    | mode of this command - set will update the servers list - get will fetch the latest server list stored |
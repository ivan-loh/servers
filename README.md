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

Submits a registry entry into the registry server or get the registry entry from the server

| Options | Description                                                                                            |
|---------|--------------------------------------------------------------------------------------------------------|
| port    | port of the listening server                                                                           |
| key     | Authentication key to use                                                                              |
| host    | host address of the server                                                                             |
| name    | name of this client server, by default will try to obtain hostname of machine                          |
| mode    | mode of this command - set will update the servers list - get will fetch the latest server list stored |

```
server-client --port 9999 --key test --host http://localhost --name devServer --mode set
server-client --port 9999 --key test --host http://localhost --name devServer --mode get
```


### as a module example

a [sample script](https://gist.github.com/ivan-loh/5589abb80ba36c8a5b68) that i am using and a sample outcome:
![Sample of lsserver output](https://gist.githubusercontent.com/ivan-loh/5589abb80ba36c8a5b68/raw/b19fdeb7148c8d432b6620e204e52dfc3949ce91/lsservers-sample.png)



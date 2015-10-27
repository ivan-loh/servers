# Servers
A ~~service~~ server registry of sort. 
*nix only


```
curl -H "Authorization: Bearer 6d85a905"  http://localhost:3000/list/
```

### Options - Server

| Options | Description                            |
|---------|----------------------------------------|
| port    | port the server listens to for request |
| key     | Authentication key to use              |


## Options - Client
| Options | Description                                                                                            |
|---------|--------------------------------------------------------------------------------------------------------|
| port    | port of the listening server                                                                           |
| key     | Authentication key to use                                                                              |
| host    | host address of the server                                                                             |
| name    | name of this client server, by default will try to obtain hostname of machine                          |
| mode    | mode of this command - set will update the servers list - get will fetch the latest server list stored |
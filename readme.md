# Nodejs user authentication sample base on json web token #

[![Build Status](https://travis-ci.org/weihanchen/user-authentication-nodejs.svg?branch=master)](https://travis-ci.org/weihanchen/user-authentication-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/weihanchen/user-authentication-nodejs/badge.svg?branch=master)](https://coveralls.io/github/weihanchen/user-authentication-nodejs?branch=master)
[![Dependency Status](https://david-dm.org/weihanchen/user-authentication-nodejs.svg)](https://david-dm.org/weihanchen/user-authentication-nodejs)
[![devDependencies Status](https://david-dm.org/weihanchen/user-authentication-nodejs/dev-status.svg)](https://david-dm.org/weihanchen/user-authentication-nodejs?type=dev)

A nodejs server api for user authentication and use react to design frontend

## [Demo Site](https://user-authentication-nodejs.herokuapp.com/) ##

## Heroku Deployment ##

You can quickly setup a sample heroku application by clicking the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Our Database v3.2
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework v7.1.0
* [NPM](https://www.npmjs.com/) - Package Management v3.10.9

## System Environment Variables ##
* PORT
* SECRET_KEY
* MONGO_CONNECTION

## Install server dependence packages ##
```
$ cd server
$ npm install
$ npm run dev //or npm run product
```

## Install client dependence packages ##
```
$ cd client
$ npm install
```

## [client react documentation](client/readme.md) ##
* client/readme.md

## Config ##
>1. config/database.js - database and jwt secret configuration
>2. secret - jwt auth secret
>3. database - database connection

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [Simple JWT](https://www.npmjs.com/package/jwt-simple) - token use
>3. [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
>4. [moment](http://momentjs.com/docs/) - date parse
>5. [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - ecrypt password

## Step ##
>1. edit config/database.js - database connection and jwt secret
>2. edit config/initial.js - super admin account and role's permissions
>3. run api server - npm run dev
>4. post /api/initialize to create roles and super admin account
>5. post api/users - create new account
>6. post api/users/login - login and get jwt token then frontend can store this token to use other api
>7. use request header: {Authorization: (jwt token)} when use other api
>8. [read documentation to use api](#Documentation)

## Authentication ##
Check token valid
* `/api/users/logout`

Check token valid and expired
* `/api/users/:id`
* `/api/users/me`

## Permissions(roles) ##
* admin
	* `delete` - other users and roles
	* `get` - all users and roles
	* `post` - user and role
	* `put` - all users and other user's role

* user
	* `delete` - self
	* `get` - self
	* `post` - signup
	* `put` - self but cannot update role

## Documentation ##

* request header - Authorization (json web token)

* **api** - api root

* **api/initialize**

  ` post - create roles and admin user`

* **api/users**

  ` post - create new user `


* **api/users/login**

	`post - login and get jwt token`

* **api/users/me**

	`get - get current user info`

* **api/users/:id**

	` delete - delete user `

	` get - get user info `

	` put - update username、displayName only superadmin can update other user's role`



## API Test ##
* npm install --dev
* npm run test


## To Do ##
* admin dashboard
* edit role name
* edit password
* add more test case for permissions
* add business logic extension framework document
* add swagger ui

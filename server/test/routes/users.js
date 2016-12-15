let supertest = require('supertest');
let moment = require('moment');
let should = require('should');
let util = require('util');
module.exports = (app, username, displayName, password) => {
    let request = supertest(app);
    let initializeUrl = '/api/initialize';
    let usersUrl = '/api/users';
    let loginUrl = '/api/users/login';
    let logoutUrl = '/api/users/logout';
    let meUrl = '/api/users/me';
    describe('initialize...', () => {
        it('should response status 200 when initialize', function(done) {
            request.post(initializeUrl)
                .expect(200)
                .end(function(err, res) {
                    done(err);
                })
        })
    })
    describe('signup...', () => {
        it('should response status 200 when signup', function(done) {
            request.post(usersUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    displayName: displayName,
                    password: password,
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                })
        })
    })

    describe('Login', () => {
        it('should response status 400 and message conatins User not found.', function(done) {
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: 'User Not Found',
                    password: 'User Not Found'
                })
                .expect(400)
                .end(function(err, res) {
                    res.body.message.should.equal('User not found.');
                    done(err);
                });
        })
    })

    describe('Logout', () => {
        let token;
        let userid;
        before((done) => {
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    password: password
                })
                .expect(200)
                .end(function(err, res) {
                    token = res.body.token;
                    userid = res.body.uid;
                    done(err);
                });
        });

        it('should response status 401 when not send with token', function(done) {
            request.post(logoutUrl)
                .expect(401)
                .end(function(err, res) {
                    done(err)
                });
        });

        it('should response 200 and contains Successful Logout.', function(done) {
            request.post(logoutUrl)
                .set('Authorization', token)
                .expect(200)
                .end(function(err, res) {
                    res.body.message.should.equal('Successful Logout.');
                    done(err);
                });
        });

        it('should response status 401 when delete user after logout', function(done) {
            resourceUrl = usersUrl + '/' + userid;
            request.delete(resourceUrl)
                .set('Authorization', token)
                .expect(401)
                .end(function(err, res) {
                    done(err);
                })
        });
    })

    describe('User Role Operation', () => {
        let token;
        let userid;
        before((done) => { //login and save token
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    password: password
                })
                .expect(200)
                .end(function(err, res) {
                    token = res.body.token;
                    userid = res.body.uid;
                    done(err);
                })

        })

        describe('get user info...', () => {
            it('should response status 401 when not send with token', function(done) {
                request.get(meUrl)
                    .expect(401)
                    .end(function(err, res) {
                        done(err);
                    })
            })
            it('should response status 200 and contains username、displayName when header has jwt token when get /users/me', function(done) {
                request.get(meUrl)
                    .set('Authorization', token)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('uid');
                        res.body.should.have.property('username');
                        res.body.should.have.property('displayName');
                        done(err);
                    })
            })
        })

        describe('delete user...', () => {
            let resourceUrl;
            before(function() {
                resourceUrl = usersUrl + '/' + userid;
            })
            it('should response success when deleting user exist', function(done) {
                request.delete(resourceUrl)
                    .set('Authorization', token)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('success');
                        res.body.success.should.equal(true);
                        done(err);
                    })
            })
            it('should response not found when user not exist', function(done) {
                request.delete(resourceUrl)
                    .set('Authorization', token)
                    .expect(404)
                    .end(function(err, res) {
                        res.body.message.should.equal('resource not found');
                        done(err);
                    })
            })
        })
    })
}

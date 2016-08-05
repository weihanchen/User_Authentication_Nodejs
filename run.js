global.__base = __dirname + '/';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//the routing modules
const users = require(__base + 'routes/users');
app.set('port', process.env.PORT || 3000);
let config = require(__base + 'config/database'); // get db config file
let morgan = require('morgan');
let mongoose = require('mongoose');
let jwtauth = require(__base + 'middleware/jwtauth')();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log to console
app.use(morgan('dev'));

app.use(jwtauth.initialize());

mongoose.connect(config.database);
let apiRoutes = express.Router();
apiRoutes.route('/users')
    .post(users.signup)
apiRoutes.route('/users/login')
    .post(users.login)
apiRoutes.use(jwtauth.authenticate()).route('/users/me')
    .get(users.me)
app.use('/api', apiRoutes);
app.use(errorHandler);


app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json(err);
}

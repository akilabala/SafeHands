var Doctor = require('../models/doctor');
var Appointment = require('../models/appointment');
var jwt = require('jsonwebtoken');
var config = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function (app, express) {

    var apiRouter = express.Router();

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRouter.post('/authenticate', function (req, res) {
        console.log(req.body.username);

        // find the user
        Doctor.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {

            if (err) throw err;

            // no user with that username was found
            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });

    apiRouter.route('/appointments')
        .post(function (req, res) {

            var appointment = new Appointment();
            appointment.firstName = req.body.firstName;
            appointment.lastName = req.body.lastName;
            appointment.phone = req.body.phone;
            appointment.emailId = req.body.emailId;
            appointment.speciality = req.body.speciality;
            appointment.appointmentDate = req.body.appointmentDate;
            appointment.appointmentTime = req.body.appointmentTime;

            appointment.save(function (err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({success: false, message: 'Appointment Already exists'});
                    else
                        return res.send(err);
                }

                // return a message
                res.json({message: 'Appointment created!'});
            })

        });

    apiRouter.route('/appointments/:id')
        .options(function (req, res) {
            res.json({message: 'Resource is valid!'});
        });


/*    // route middleware to verify a token
    apiRouter.use(function (req, res, next) {
        // do logging
        console.log('Somebody just came to our app!');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err)
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                else
                // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
            });

        } else {

            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            return res.status(403).send({success: false, message: 'No token provided.'});

        }

        next(); // make sure we go to the next routes and don't stop here
    });*/


    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/api
    apiRouter.get('/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/doctors')

        // create a user (accessed at POST http://localhost:8080/users)
        .post(function (req, res) {

            var doctor = new Doctor();		// create a new instance of the User model
            doctor.lastName = req.body.lastName;  // set the users name (comes from the request)
            doctor.firstName = req.body.firstName;  // set the users name (comes from the request)
            doctor.username = req.body.username;  // set the users username (comes from the request)
            doctor.password = req.body.password;  // set the users password (comes from the request)
            doctor.speciality = req.body.speciality;  // set the users password (comes from the request)

            doctor.save(function (err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({success: false, message: 'A user with that username already exists. '});
                    else
                        return res.send(err);
                }

                // return a message
                res.json({message: 'User created!'});
            });

        })

        // get all the users (accessed at GET http://localhost:8080/api/users)
        .get(function (req, res) {
            Doctor.find({}, function (err, doctors) {
                if (err) res.send(err);

                // return the users
                res.json(doctors);
            });
        });

    // on routes that end in /users/:user_id
    // ----------------------------------------------------
    apiRouter.route('/doctors/:doctor_id')

        // get the user with that id
        .get(function (req, res) {
            Doctor.findById(req.params.doctor_id, function (err, doctor) {
                if (err) res.send(err);

                // return that user
                res.json(doctor);
            });
        })

        // update the user with this id
        .put(function (req, res) {
            Doctor.findById(req.params.doctor_id, function (err, doctor) {

                if (err) res.send(err);

                // set the new user information if it exists in the request
                if (req.body.lastName) doctor.lastName = req.body.lastName;
                if (req.body.firstName) doctor.firstName = req.body.firstName;
                if (req.body.username) doctor.username = req.body.username;
                if (req.body.password) doctor.password = req.body.password;
                if (req.body.speciality) doctor.speciality = req.body.speciality;

                // save the user
                user.save(function (err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({message: 'User updated!'});
                });

            });
        })

        // delete the user with this id
        .delete(function (req, res) {
            Doctor.remove({
                _id: req.params.doctor_id
            }, function (err, doctor) {
                if (err) res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

    // api endpoint to get user information
    apiRouter.get('/me', function (req, res) {
        res.send(req.decoded);
    });

    apiRouter.route('/appointments')
        // get all the users (accessed at GET http://localhost:8080/api/appointment)
        .get(function (req, res) {
            Appointment.find({}, function (err, appointments) {
                if (err) res.send(err);

                // return the users
                res.json(appointments);
            });

        });

    apiRouter.route('/appointment/:doctor_id')
        // get all the users (accessed at GET http://localhost:8080/api/appointment)
        .get(function (req, res) {
            var start = new Date();
            console.log(start);
            Doctor.findById(req.params.doctor_id, function (err, doctor) {
                if (err) res.send(err);
                Appointment.find({speciality:doctor.speciality, appointmentDate: {$gte: start} }, function (err, appointments) {
                    if (err) res.send(err);

                    // return the users
                    res.json(appointments);
                });
            });

        });

    return apiRouter;
};
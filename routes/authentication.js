const Owner = require('../models/owner');

module.exports = (router) => {
    //register route to register
    router.post('/register', (req, res) => {
        if (!req.body.firstName) {
            res.json({ success: false, message: 'You must provide a first name' }); // Return error
        } else {
            if (!req.body.lastName) {
                res.json({ success: false, message: 'You must provide a last name' }); // Return error
            } else {
                if (!req.body.username) {
                    res.json({success: false, message: 'You must provide a username'}); // Return error
                }
                else {
                    if (!req.body.password) {
                        res.json({success: false, message: 'You must provide a password'}); // Return error
                    } else {

                        if (!req.body.email) {
                            res.json({success: false, message: 'You must provide an email'}); // Return error

                        } else {
                            if (!req.body.telephone) {
                                res.json({success: false, message: 'You must provide a telephone'}); // Return error
                            } else {


                                // Create new user object and apply user input
                                let owner = new Owner({
                                    firstName: req.body.firstName.toLowerCase(),
                                    lastName: req.body.lastName.toLowerCase(),
                                    username: req.body.username.toLowerCase(),
                                    password: req.body.password,
                                    email: req.body.email.toLowerCase(),
                                    telephone: req.body.telephone
                                });
                                // Save user to database
                                owner.save((err) => {
                                    // Check if error occured
                                    if (err) {
                                        // Check if error is an error indicating duplicate account
                                        if (err.code === 11000) {
                                            res.json({success: false, message: 'Username or e-mail already exists'});
                                        } else {
                                            if (err.errors) {
                                                if (err.errors.firstName) {
                                                    res.json({success: false, message: err.errors.firstName.message});
                                                } else {
                                                    if (err.errors.lastName) {
                                                        res.json({success: false, message: err.errors.lastName.message
                                                        });
                                                    } else {
                                                        if(err.errors.username){
                                                            res.json({success: false, message: err.errors.username.message});

                                                        }else {
                                                        if (err.errors.password) {
                                                            res.json({success: false, message: err.errors.password.message
                                                            });
                                                        } else {
                                                            if (err.errors.email) {
                                                                res.json({success: false, message: err.errors.email.message
                                                                });
                                                            } else {
                                                                if (err.errors.telephone) {
                                                                    res.json({success: false, message: err.errors.telephone.message
                                                                    });
                                                                } else {
                                                                    res.json({success: false, message: err}); // Return any other error not already covered
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                }
                                            } else {
                                                res.json({
                                                    success: false,
                                                    message: 'Could not save user. Error: ',
                                                    err
                                                }); // Return error if not related to validation
                                            }
                                        }
                                    } else {
                                        res.json({success: true, message: 'Account registered!'}); // Return success
                                    }
                                });
                            }
                        }
                    }
            }
            }
        }
    });

    return router; // Return router object to main index.js
}
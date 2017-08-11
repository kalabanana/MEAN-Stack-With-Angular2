const Owner = require('../models/owner');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

//in database

module.exports = (router) => {
    //register route to register
    router.post('/get',(req, res)=>{
        res.send('test');
    });

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
                                            res.json({ success: false, message: 'Email, Username or Telephone already exist.'});
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
                                        res.json({success: true, message: 'Account successfully registered!'}); // Return success
                                    }
                                });
                            }
                        }
                    }
            }
            }
        }
    });
    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' }); // Return error
        } else {
            Owner.findOne({ username: req.params.username }, (err, owner) => {
                if (err) {
                    res.json({ success: false, message: err }); // Return connection error
                } else {
                    if (owner) {
                        res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
                    } else {
                        res.json({ success: true, message: 'Username is available' }); // Return as vailable username
                    }
                }
            });
        }
    });
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' }); // Return error
        } else {
            Owner.findOne({ email: req.params.email }, (err, owner) => {
                if (err) {
                    res.json({ success: false, message: err }); // Return connection error
                } else {
                    if (owner) {
                        res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
                    } else {
                        res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
                    }
                }
            });
        }
    });


    // above is for registration

//     router.post('/login', (req, res) => {
//         if (!req.body.email) {
//             res.json({ success: false, message: 'Email was not provided'})
//         }else {
//             if(!req.body.password){
//                 res.json({success: false, message: 'Password was not provided'})
//             } else{
//                 Owner.findOne({email: req.body.email.toLowerCase() }, (err, owner) => {
//                     if(err){
//                         res.json({success: false, message: err})
//                     }else {
//                         if(!owner){
//                             res.json({success: false, message: "Email was not found"})
//                         }else {
//                             const validPassword = owner.comparePassword(req.body.password) //password that user provided
//                             if(!validPassword){
//                                 res.json({success: false, message: "Password does not match"})
//                             }else{
// // token for 24 hours
//                                 const token =  jwt.sign({ownerId: owner.__id}, config.secret, {expiresIn: '24h'})
//
//                                 res.json({success: true, message: "Successfully Logged In!", token: token, owner:{email: owner.email}})
//                             }
//                         }
//                     }
//                 })
//             }
//         }
//     });

    return router; // Return router object to main index.js
}
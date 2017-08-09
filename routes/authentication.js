const Owner = require('../models/owner')

module.exports = (router) => {
    router.post('/register', (req,res) => {
        if(!req.body.name){
            res.json({success:false, message:'Must provide your name'})
        }else {
            if(!req.body.username){
                res.json({success:false, message:'Must provide a username'})
            }else{
                if(!req.body.password){
                    res.json({success:false, message:'Must provide a password'})
                }else{
                    if(!req.body.email){
                        res.json({success:false, message:'Must provide an email'})
                    }else{
                        if(!req.body.telephone){
                            res.json({success:false, message:'Must provide a telephone number'})
                        }else{
                            let owner = new Owner({
                                name: req.body.name,
                                username: req.body.username.toLowerCase(),
                                password: req.body.password,
                                email: req.body.email.toLowerCase(),
                                telephone: req.body.telephone
                            });
                            owner.save((err) => {
                                if(err){
                                    if(err.code === 11000){ //duplicates
                                        res.json({ success: false, message: "input fields are already in database"})
                                    }
                                    res.json({ success:false, message:"Couldn't save user, error", err })
                                }else {
                                    res.json({ success: true, message:"successfully save user"})
                                }
                            })

                        }
                    }
                }
            }
        }
    });

    return router;
}
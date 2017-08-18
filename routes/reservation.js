const Book = require('../models/booking');

module.exports = (router) => {

    //send booking data to database;
    router.post('/home', (req, res) => {
        if(!req.body.name){
            res.json({success: false, message: "You must provide a name"})
        }else {
            if(!req.body.party){
                res.json({success: false, message: "You must provide a party size"})
            }else {
                if(!req.body.date){
                    res.json({success: false, message:"You must provide a date"})
                }else {
                    if (!req.body.telephone) {
                        res.json({success: false, message: "You must provide a telephone"})
                    } else {
                        let booking = new Book({
                            name: req.body.name,
                            party: req.body.party,
                            date: req.body.date,
                            telephone: req.body.telephone,
                            startTime: (new Date(req.body.date).getTime()),
                            endTime: (new Date(req.body.date).getTime()) + 3600 * 1000,
                            tableId: Math.floor(Math.random() * 20 + 1),
                        });
                        booking.save((err, req) => {
                            if (err) {
                                res.json({success: false, message: err})
                            } else {
                                console.log(req);
                                res.json({success: true, message: "Successfully booked a table with us! Redirecting now!",id: req._id })
                            }
                        });

                    }
                }
            }
        }
    });

    // 下面是okay
    router.get('/confirm/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No ID was provided.' });
        } else {
            Book.findOne({ _id: req.params.id }, (err, booking) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid id' });
                } else {
                    if (!booking) {
                        res.json({ success: false, message: 'ID not found.' });
                    } else {
                        res.json({ success: true, booking: booking });
                    }
                }
            });
        }
    });


    router.get('/allReservations', (req, res) => {
        Book.find({}, (err, bookings)=>{
            if(err){
                res.json({success: false, message: err})
            }else {
                if(!bookings){
                    res.json({success: false, message: 'No bookings are found!'})
                }else {
                    res.json({success: true, bookings: bookings})
                }
            }
        }).sort({'date': -1}) //-1 descending order
    })


    //ok!!
    router.put('/updateReservation', (req, res)=> {
        if(!req.body._id){
            res.json({ success: false, message: 'No ID was provided'})
        }else {
            Book.findOne({ _id: req.body._id}, (err, booking) =>{
                if(err){
                    res.json({ success: false, message: err})
                }else {
                    if(!booking){
                        res.json({ success: false, message: 'Confirmation Code was not found!'})
                    }else {
                        booking.username = req.body.username;
                        booking.name = req.body.name;
                        booking.party = req.body.party;
                        booking.date = req.body.date;
                        booking.telephone = req.body.telephone;

                        booking.save((err) => {
                            if(err){
                                res.json({ success: false, message: err})
                            } else {
                                res.json({ success: true, message: "Successfully updated your reservation!"})
                            }
                        })
                    }
                }
            })
        }
    });


//ok
    router.delete('/remove-confirm/:id', (req,res) =>{
        if(!req.params.id){
            res.json({ success:false, message: 'ID was not provided'})
        }else {
            Book.findOne({ _id : req.params.id}, (err, booking)=> {
                if(err){
                    res.json({ success:false, message: err})
                }else {
                    if(!booking){
                        res.json({ success: false, message: 'Confirmation code was not found'})
                    }else {
                        booking.remove((err) => {
                            if(err){
                                res.json({success:false, message: err })
                            }else {
                                res.json({success: true, message: "Successfully removed reservation!"})
                            }
                        })
                    }
                }
            })
        }

    });

    return router;

}
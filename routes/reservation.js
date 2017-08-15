const Book = require('../models/booking');
const config = require('../config/database');



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
                }else{
                        let booking = new Book({
                            name: req.body.name.toLowerCase(),
                            party: req.body.party.toString(),
                            date: req.body.date,
                            startTime: (new Date(req.body.date).getTime()),
                            endTime: (new Date(req.body.date).getTime()) + 3600*1000,
                            tableId: Math.floor(Math.random() * 20 + 1),
                    });
                    console.log(booking);
                        booking.save((err)=>{
                            if(err){
                                res.json({success: false, message: err})
                            }else {
                                res.json({success: true, message: "Successfully booked a table with us!"})
                            }
                        })

                    }
                }
            }
    });
    // router.get('/confirm/id', (res,req)=>{
    //     if(!req.params._id){
    //         res.json({success: false, message:'id was not provided'})
    //     }else {
    //         Book.findOne({_id : req.params._id}, (err, book) => {
    //             if(err){
    //                 res.json({success: false, message: err})
    //             }else {
    //                 if(!book){
    //                     res.json({success: false, message: "reservation not found"})
    //                 }else {
    //                     res.json({success: true, message: "successfully retrieved data"});
    //                 }
    //             }
    //         })
    //     }
    // })
    return router;

}
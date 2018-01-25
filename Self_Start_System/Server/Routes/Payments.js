const Payment = require('../Models/Payment');

module.exports = function (router){

    //get specific Payment
    router.get('/:paymentID', function (req, res) {
        if (!(req.params.paymentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Payment.findOne({paymentID: req.params.paymentID}, function (err, payment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return payment object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved payment with id ' + req.params.paymentID),
                        payment: payment
                    })
                }
            })
        }
    });

    //get all payments
    router.get('/', function (req, res) {
        Payment.find({}, function (err, payments) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all payments
                res.json({
                    success: true,
                    message: 'Success! Retrieved all payments',
                    payments: payments
                })
            }
        })
    });

    //post a payment
    router.post('/', function (req, res) {
        if (!req.body.paymentID){
            res.json({success: false, message: "No paymentID detected."});
        } else if (!req.body.amount) {
            res.json({success: false, message: "No amount detected."});
        } else if (!req.body.note) {
            res.json({success: false, message: "No note detected."});
        } else {

            //create a new payment instance to be saved
            var payment = new Payment({
                paymentID: req.body.paymentID,
                amount: req.body.amount,
                note: req.body.note
            });

            //save it
            payment.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "Payment saved!"});
                }
            })
        }
    });

    //change decision and time stamp of payment
    router.put('/:paymentID', function (req, res) {
        if (!req.body.paymentID){
            res.json({success: false, message: "No paymentID detected."});
        } else if (!req.body.amount) {
            res.json({success: false, message: "No amount detected."});
        } else if (!req.body.note) {
            res.json({success: false, message: "No note detected."});
        } else {
            Payment.findOne({paymentID: req.params.paymentID}, function (err, payment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update to new decision and time stamp
                    payment.amount = req.body.amount;
                    payment.note = req.body.note;

                    //save changes
                    payment.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to payment saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete payment
    router.delete('/:paymentID', function (req, res) {
        if (!(req.params.paymentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Payment.findOne({paymentID: req.params.paymentID}, function (err, payment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    payment.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'payment deleted!'});
                        }
                    })
                }
            })
        }
    });

    return router;
};

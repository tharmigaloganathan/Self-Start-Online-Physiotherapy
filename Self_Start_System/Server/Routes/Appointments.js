const Appointment = require('../Models/');

module.exports = function (router){

    //get specific Appointment
    router.get('/:appointmentID', function (req, res) {
        if (!(req.params.appointmentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Appointment.findOne({appointmentID: req.params.appointmentID}, function (err, appointment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return appointment object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved appointment with id ' + req.params.appointmentID),
                        appointment: appointment
                    })
                }
            })
        }
    });

    //get all appointments
    router.get('/', function (req, res) {
        Appointment.find({}, function (err, appointments) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all appointments
                res.json({
                    success: true,
                    message: 'Success! Retrieved all appointments',
                    appointments: appointments
                })
            }
        })
    });

    //post a appointment
    router.post('/', function (req, res) {
        if (!req.body.appointmentID){
            res.json({success: false, message: "No appointmentID detected."});
        } else if (!req.body.date){
            res.json({success: false, message: "No date detected."});
        } else if (!req.body.reason) {
            res.json({success: false, message: "No reason detected."});
        } else if (!req.body.other) {
            res.json({success: false, message: "No other detected."});
        } else {

            //create a new appointment instance to be saved
            var appointment = new Appointment({
                appointmentID: req.body.appointmentID,
                date: req.body.date,
                reason: req.body.reason,
                other: req.body.other
            });

            //save it
            appointment.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "Appointment saved!"});
                }
            })
        }
    });

    //change decision and time stamp of appointment
    router.put('/:appointmentID', function (req, res) {
        if (!req.body.appointmentID){
            res.json({success: false, message: "No appointmentID detected."});
        } else if (!req.body.date){
            res.json({success: false, message: "No date detected."});
        } else if (!req.body.reason) {
            res.json({success: false, message: "No reason detected."});
        } else if (!req.body.other) {
            res.json({success: false, message: "No other detected."});
        } else {
            Appointment.findOne({appointmentID: req.params.appointmentID}, function (err, appointment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update to new decision and time stamp
                    appointment.date = req.body.date;
                    appointment.reason = req.body.reason;
                    appointment.other = req.body.other;

                    //save changes
                    appointment.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to appointment saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete appointment
    router.delete('/:appointmentID', function (req, res) {
        if (!(req.params.appointmentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Appointment.findOne({appointmentID: req.params.appointmentID}, function (err, appointment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    appointment.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'appointment deleted!'});
                        }
                    })
                }
            })
        }
    });

    return router;
};

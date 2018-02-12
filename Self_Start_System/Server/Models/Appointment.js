var mongoose = require('mongoose');
var appointmentSchema = mongoose.Schema(
    {
        date: Date,
        reason: String,
        other: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Appointments = module.exports = mongoose.model('Appointment', appointmentSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};


function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Appointments.findById(id, function (error, appointment) {
            if (error){
                reject(error);
            }else{
                appointment.remove(function (err) {
                    if (err){
                        reject(error);
                    } else {
                        resolve(appointment);
                    }
                })
            }
        });
    });
}

function update(id, updatedAppointment){
    return new Promise (function (resolve, reject) {
        if (!updatedAppointment.date){
            err = "No date detected.";
            reject(err);
        } else if (!updatedAppointment.reason){
            err = "No reason detected.";
            reject(err);
        } else if (!updatedAppointment.other){
            err = "No other detected.";
            reject(err);
        } else if (!updatedAppointment.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else {
            Appointments.findById(id, function (error, appointment) {
                if (error) {
                    reject(error);
                }
                else {
                    appointment.date = updatedAppointment.date;
                    appointment.reason = updatedAppointment.reason;
                    appointment.other = updatedAppointment.other;
                    appointment.patientProfile = updatedAppointment.patientProfile;
                    appointment.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(appointment);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        Appointments.findById(id, function (error, appointment) {
            if (error){
                reject(error);
            }else{
                resolve(appointment);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        Appointments.find({},function (error, appointments) {
            if (error){
                reject(error);
            }else{
                resolve(appointments);
            }
        });
    });
}

function add(appointment){
    return new Promise (function (resolve, reject) {
        var newAppointment = new Appointments(appointment);
        if (!newAppointment.date){
            err = "No date detected.";
            reject(err);
        } else if (!newAppointment.reason){
            err = "No reason detected.";
            reject(err);
        } else if (!newAppointment.other){
            err = "No other detected.";
            reject(err);
        } else if (!newAppointment.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else {
            newAppointment.save(function (error) {
                if (error){
                    reject(err);
                }else{
                    resolve(newAppointment);
                }
            });
        }
    });
}


var mongoose = require('mongoose');
var appointmentSchema = mongoose.Schema(
    {
        date: Date,
        endDate: Date,
        reason: String,
        other: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'},
      physiotherapist: {type: mongoose.Schema.ObjectId, ref: 'Physiotherapist'}
    }
);
var Appointments = module.exports = mongoose.model('Appointment', appointmentSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
    getByPhysio:getByPhysio
};

var PatientProfiles = require("./PatientProfile");


function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Appointments.findById(id, function (error, appointment) {
            if (error){
                reject(error);
            }else{
                appointment.remove(function (error) {
                    if (error){
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
            error = "No date detected.";
            reject(error);
        } else if (!updatedAppointment.reason){
            error = "No reason detected.";
            reject(error);
        } else if (!updatedAppointment.other){
            error = "No other detected.";
            reject(error);
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
            console.log(appointments);
            if (error){
                reject(error);
            }else{
                resolve(appointments);
            }
        });
    });
}

function getByPhysio(physioID){
    return new Promise (function (resolve, reject) {
        Appointments.find({physiotherapist: physioID},function (error, appointments) {
            console.log(appointments);
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
            error = "No date detected.";
            reject(error);
        } else if (!newAppointment.endDate) {
            error = "No endDate detected.";
            reject(error);
        } else if (!newAppointment.reason){
            error = "No reason detected.";
            reject(error);
        } else if (!newAppointment.other) {
          error = "No other detected.";
          reject(error);
        } else if (!newAppointment.patientProfile) {
          error = "No patientProfile detected.";
          reject(error);
        } else if (!newAppointment.physiotherapist) {
          error = "No physiotherapist detected.";
          reject(error);
        } else {
          newAppointment.save(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(newAppointment);
            }
          });
        }
    });
}


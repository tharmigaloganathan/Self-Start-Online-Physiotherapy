var mongoose = require('mongoose');
var autoIncrement = require('mongoose-plugin-autoinc');
var patientProfileSchema = mongoose.Schema(
    {
        familyName: String,
        givenName: String,
        email: String,
        DOB: Date,
        postalCode: String,
        address: String,
        phone: String,
        others: String,
        account: {type: mongoose.Schema.ObjectId, ref: 'UserAccount'},
        treatments: [{type: mongoose.Schema.ObjectId, ref: 'Treatment'}],
        payments: [{type: mongoose.Schema.ObjectId, ref: 'Payment'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'},
        city: String,
        gender: {type: mongoose.Schema.ObjectId, ref: 'Gender'},
        appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointment'}]
    }
);

// patientProfileSchema.plugin(autoIncrement.plugin,{model: 'PatientProfile', field: 'patientID'});
var PatientProfiles = module.exports = mongoose.model('PatientProfile', patientProfileSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
  addAppointment:addAppointment,
  getAllAppointments:getAllAppointments
};

var Appointments = require("./Appointment");
var Physiotherapists = require("./Physiotherapist");

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        PatientProfiles.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (error) {
                    if (error){
                        reject(error);
                    } else {
                        resolve(document);
                    }
                })
            }
        });
    });
}

function update(id, updatedDocument){
    return new Promise (function (resolve, reject) {
        if (!updatedDocument.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!updatedDocument.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!updatedDocument.email){
            error = "No email detected.";
            reject(error);
        } else if (!updatedDocument.DOB){
            error = "No DOB detected.";
            reject(error);
        } else if (!updatedDocument.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!updatedDocument.address){
            error = "No address detected.";
            reject(error);
        } else if (!updatedDocument.phone){
            error = "No phone detected.";
            reject(error);
        } else if (!updatedDocument.city){
            error = "No cities detected.";
            reject(error);
        } else {
            PatientProfiles.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.familyName = updatedDocument.familyName;
                    document.givenName = updatedDocument.givenName;
                    document.email = updatedDocument.email;
                    document.DOB = updatedDocument.DOB;
                    document.postalCode = updatedDocument.postalCode;
                    document.address = updatedDocument.address;
                    document.phone = updatedDocument.phone;
                    document.others = updatedDocument.others;
                    document.account = updatedDocument.account;
                    document.treatments = updatedDocument.treatments;
                    document.payments = updatedDocument.payments;
                    document.country = updatedDocument.country;
                    document.province = updatedDocument.province;
                    document.city = updatedDocument.city;
                    document.gender = updatedDocument.gender;
                    document.appointments = updatedDocument.appointments;
                    document.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(document);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        PatientProfiles.findById(id).populate({path: 'treatments', populate: {path: 'rehabilitationPlan'}}).exec(function (error, document) {
            if (error){
                reject(error);
            }else{
                resolve(document);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        PatientProfiles.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}

function add(object){
    return new Promise (function (resolve, reject) {
        var document = new PatientProfiles(object);
        if (!document.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!document.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.DOB){
            error = "No DOB detected.";
            reject(error);
        } else if (!document.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!document.address){
            error = "No address detected.";
            reject(error);
        } else if (!document.phone){
            error = "No phone detected.";
            reject(error);
        } else if (!document.city){
            error = "No cities detected.";
            reject(error);
        } else {
            document.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(document);
                }
            });
        }
    });
}

// Added 1 appointment to the body of the thing
function addAppointment(id, body) {
  return new Promise (function (resolve, reject) {
    if (!body.startDate) {
      error = "No startDate detected.";
      reject(error);
    } else if (!body.endDate) {
      error = "No endDate detected.";
      reject(error);
    } else if (!body.physioID){
      error = "No physioID detected.";
      reject(error);
    } else if (!body.timeslotId){
      error = "No timeslotId detected.";
      reject(error);
    }else {
      PatientProfiles.findById(id, function (error, document) {
        if (error) {
          reject(error);
        }
        else {
          // Add new appointment
          Appointments.add({
            date: body.startDate,
            endDate: body.endDate,
            reason: "testingReason",
            other: "otherReason",
            patientProfile: document._id
          }).then(function (appointment) {
            // Add the appointment to the patient profile
            document.appointments.push(appointment._id);

            // Block off the time occupied by appointment
            Physiotherapists.splitTimeSlotDueToAppointment(
              body.physioID,
              body.timeslotId,
              appointment.date,
              appointment.endDate
            );

            // Save the patient profile document
            document.save(function (error) {
              if (error) {
                reject(error);
              } else {
                resolve(document);
              }
            });
          }).catch(function (error) {
            reject(error);
          });
        }
      });
    }
  })
}

// Retrieves more appointments
function getAllAppointments(id) {
  console.log("getAllAppointments ");
  return new Promise (function (resolve, reject) {
    PatientProfiles.findById(id, function (error, document) {
      if (error) {
        reject(error);
      }
      else {
        // Stores all appointments in a list
        let allAppointmentList = new Array();

        // Function to gather appointments one-by-one
        let getAppointments = index => {
          console.log("starting ", index);
          return new Promise((resolve, reject)=>{
            if (index < document.appointments.length){
              Appointments.getOne(document.appointments[index]).then( response => {
                allAppointmentList.push(response);
                getAppointments(index+1).then(response=>{
                  resolve(response);
                }).catch(err=>{
                  reject(err);
                });
              }).catch(err => {
                reject(err);
              });
            } else {
              resolve("Done");
            }
          })
        };

        // Start function
        getAppointments(0).then(response=>{
          resolve(
            allAppointmentList
          )
        }).catch(err=>{
          reject(err);
        });
      }
    });
  })
}
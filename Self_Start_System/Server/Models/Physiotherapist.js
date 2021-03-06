var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
	{
		familyName: String,
		givenName: String,
		email: String,
		dateHired: Date,
		dateFinished: Date,
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatment')}],
		userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')},
        availableTimeSlots: [{startDate: Date, endDate: Date}],
        appointments: [{type: mongoose.Schema.ObjectId, ref: ('Appointment')}]
	}
);

var Physiotherapists = module.exports =  mongoose.model('Physiotherapist', physiotherapistSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
    addFreeTimeSlot:addFreeTimeSlot,
    changeOneDate:changeOneDate,
    splitTimeSlotDueToAppointment:splitTimeSlotDueToAppointment,
  deleteOneDate:deleteOneDate,
  addAppointment:addAppointment,
  getAllAppointments:getAllAppointments
};

var Appointments = require("./Appointment");
var PatientProfiles = require("./PatientProfile");
// Time in milliseconds
const MIN_TIMESLOT_LENGTH = 300000; // 5 minutes

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Physiotherapists.findById(id, function (error, document) {
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
        } else if (!updatedDocument.dateHired){
            error = "No dateHired detected.";
            reject(error);
        } else if (!updatedDocument.dateFinished){
            error = "No dateFinished detected.";
            reject(error);
        } else {
            Physiotherapists.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.familyName = updatedDocument.familyName;
                    document.givenName = updatedDocument.givenName;
                    document.email = updatedDocument.email;
                    document.dateHired = updatedDocument.dateHired;
                    document.dateFinished = updatedDocument.dateFinished;
                    document.treatments = updatedDocument.treatments;
                    document.userAccount = updatedDocument.userAccount;
                    document.availableTimeSlots = updatedDocument.availableTimeSlots;

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
        Physiotherapists.findById(id, function (error, document) {
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
        Physiotherapists.find({}, function (error, documents) {
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
        var document = new Physiotherapists(object);
        if (!document.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!document.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.dateHired){
            error = "No dateHired detected.";
            reject(error);
        } else if (!document.dateFinished){
            error = "No dateFinished detected.";
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


// Helper function to combine all overlapping timeslots
// And delete slots where start date equals end date
function combineOverLappingDates(document) {
  // Return if less than 2 elements
  if (document.availableTimeSlots.length < 2){
   return document;
  }

  // Sort by starting date
  document.availableTimeSlots.sort(function(a,b){
    return a.startDate.getTime() - b.startDate.getTime();
  });

  console.log(document.availableTimeSlots);

  // Store the new array, with no overlaps
  let newAvailableTimeSlot = new Array();

  // Find the first valid entry and seed the array with it
  let index = 0;
  for (; index < document.availableTimeSlots.length; index++){
    let slot = document.availableTimeSlots[index];
    if(slot.endDate.getTime() - slot.startDate.getTime() > MIN_TIMESLOT_LENGTH){
      // Initialize with one time slot
      newAvailableTimeSlot.push(slot);
      break;
    }
  }

  // Start at prev index
  for (let i = index; i < document.availableTimeSlots.length; i++) {
    let slot = document.availableTimeSlots[i];
    // Only consider adding time slot if the duration is more than 2 seconds long
    if (slot.endDate.getTime() - slot.startDate.getTime() > MIN_TIMESLOT_LENGTH){
      // If the current start time is greater than the last end time,
      // No overlap, so push the new object
      if (slot.startDate.getTime() > newAvailableTimeSlot[newAvailableTimeSlot.length - 1].endDate.getTime()){
        newAvailableTimeSlot.push(new Object(slot));
      } else {
        // If current start time is equal or less than the last end time,
        // Combine the two slots by taking the greatest end date
        let currentSlotEndDate = slot.endDate;
        let prevSlotEndDate = newAvailableTimeSlot[newAvailableTimeSlot.length - 1].endDate;

        // If overlap, take the greater of the two end dates
        newAvailableTimeSlot[newAvailableTimeSlot.length - 1].endDate =
          prevSlotEndDate.getTime() > currentSlotEndDate.getTime()
            ? new Date(prevSlotEndDate)
            : new Date(currentSlotEndDate);
      }
    }
  }

  document.availableTimeSlots = newAvailableTimeSlot;
  return document;
}

// Adds one free time slot
function addFreeTimeSlot(id, body){
  return new Promise (function (resolve, reject) {
      console.log("Hello", body);
      if (!body.startDate){
        error = "No startDate detected.";
        reject(error);
      } else if (!body.endDate){
      error = "No endDate detected.";
      reject(error);
    } else {
        Physiotherapists.findById(id, function (error, document) {
          console.log("FindById", document);

          if (error) {
            reject(error);
          } else {
            if (document !== null){
              document.availableTimeSlots.push({
                startDate: body.startDate,
                endDate: body.endDate
              });

              document = combineOverLappingDates(document);

              document.save(function (error) {
                if (error) {
                  reject(error);
                } else {
                  resolve(document);
                }
              });
            }
          }
        });
      }
  });
}

// Adds a new appointment
function addAppointment(id, appointmentId, timeslotId, startDate, endDate){
  return new Promise (function (resolve, reject) {
    console.log("addAppointment", id, appointmentId, timeslotId, startDate, endDate);

    Physiotherapists.findById(id, function (error, document) {
      console.log("FindById", document);

      if (error) {
        reject(error);
      } else {
        // Add appointments to document
        document.appointments.push(appointmentId);

        splitTimeSlotDueToAppointmentNoSave(document, timeslotId, startDate, endDate);

        document.save(function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(document);
          }
        });
      }
    });
  });
}

// Changes one free time slot
function changeOneDate(id, body){
  return new Promise (function (resolve, reject) {
    console.log("changeOneDate", body);
    if (!body.startDate){
      error = "No startDate detected.";
      reject(error);
    } else if (!body.endDate){
      error = "No endDate detected.";
      reject(error);
    } else if (!body.mongoId){
      error = "No mongoId detected.";
      reject(error);
    } else {
      Physiotherapists.findById(id, function (error, document) {
        if (error) {
          reject(error);
        } else {
          // Find event with the same ID
          let event = document.availableTimeSlots.find(function(element){
            return element._id.toString() === body.mongoId.toString();
          });

          // If even exists, update it. Else, throw an error
          if (event){
            // console.log("event", event);

            event.startDate = body.startDate;
            event.endDate = body.endDate;

            // console.log("event After update", event);

            document = combineOverLappingDates(document);

            document.save(function (error) {
              if (error) {
                reject(error);
              } else {
                resolve(document);
              }
            });
          } else {
            error = "Timeslot not found.";
            reject(error);
          }
        }
      });
    }
  });
}


// Changes one free time slot
function deleteOneDate(id, body){
  return new Promise (function (resolve, reject) {
    console.log("deleteOneDate", body);
    if (!body.mongoId){
      error = "No mongoId detected.";
      reject(error);
    } else {
      Physiotherapists.findById(id, function (error, document) {
        if (error) {
          reject(error);
        } else {
          // Delete the element with the matching ID
          for (let i = 0; i < document.availableTimeSlots.length; i++){
            if (document.availableTimeSlots[i]._id.toString() === body.mongoId.toString()){
              document.availableTimeSlots.splice(i,1);
            }
          }

          // Recombine date
          document = combineOverLappingDates(document);

          // Save document
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

// Splits the TimeSlot due to Patient booked appointments
function splitTimeSlotDueToAppointment(id, timeslotId, appointmentStart, appointmentEnd ){
  return new Promise (function (resolve, reject) {
    console.log("splitTimeSlotDueToAppointment");

    Physiotherapists.findById(id, function (error, document) {
      if (error) {
        reject(error);
      } else {
        // Find event with the same ID
        let event = document.availableTimeSlots.find(function (element) {
          return element._id.toString() === timeslotId.toString();
        });

        // If even exists, update it. Else, throw an error
        if (event) {
          // if (event.startDate.getTime() === appointmentStart.getTime()){
          //   console.log("Start Date equal", event);
          //   // New start time is now the appointment's end time
          //   event.startDate = appointmentEnd;
          // } else if (event.endDate.getTime() === appointmentEnd.getTime()){
          //   console.log("End Date equal", event);
          //   // New end is now the appointment's start time
          //   event.endDate = appointmentStart;
          // } else {
            console.log("No Date equal", event);
            // Create a new event based on the appointment end to the prev end
            document.availableTimeSlots.push({
              startDate: appointmentEnd,
              endDate: event.endDate
            });

            // endTime is now the appointment's start time
            event.endDate = appointmentStart;
          // }

          console.log("event After update", event);

          document = combineOverLappingDates(document);

          console.log("event After combineOverLappingDates", document);

          document.save(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(document);
            }
          });
        } else {
          error = "Timeslot not found.";
          reject(error);
        }
      }
    });
  });
}

// Retrieves every appointment from this Physiotherapist
function getAllAppointments(id){
  return new Promise (function (resolve, reject) {
    console.log("getAllAppointments", id);

    Physiotherapists.findById(id, function (error, document) {
      if (error) {
        reject(error);
      } else {
        // Stores all appointments in a list
        let allAppointmentList = [];

        // Function to gather appointments one-by-one
        let getAppointments = index => {
          console.log("starting ", index);
          return new Promise((resolve, reject)=>{
            if (index < document.appointments.length){
              Appointments.getOne(document.appointments[index]).then( response => {
                console.log("starting PatientProfiles.getOne", response);
                // Only run if response is not null
                if (response){
                  // Find the associated patient profile
                  PatientProfiles.getOne(response.patientProfile)
                    .then(result=>{
                      console.log("in PatientProfiles.getOne", result);
                      // Add the full patient profile
                      let appointmentWithName = {
                        appointment: response,
                        fullPatientProfile: result
                      };

                      allAppointmentList.push(appointmentWithName);
                      getAppointments(index+1).then(response=>{
                        resolve(response);
                      }).catch(err=>{
                        reject(err);
                      });
                    }).catch(err=>{
                      reject(err);
                  });
                } else { // If null, immediately run the next version
                  getAppointments(index+1).then(response=>{
                    resolve(response);
                  }).catch(err=>{
                    reject(err);
                  });
                }

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
  });
}

function splitTimeSlotDueToAppointmentNoSave(
  document, timeslotId, appointmentStart, appointmentEnd
){
  let event = document.availableTimeSlots.find(function (element) {
    return element._id.toString() === timeslotId.toString();
  });

  // If even exists, update it. Else, throw an error
  if (event) {

    console.log("No Date equal", event);
    // Create a new event based on the appointment end to the prev end
    document.availableTimeSlots.push({
      startDate: appointmentEnd,
      endDate: event.endDate
    });

    // endTime is now the appointment's start time
    event.endDate = appointmentStart;
    // }

    console.log("event After update", event);

    document = combineOverLappingDates(document);

    console.log("event After combineOverLappingDates", document);

  } else {
    console.log("ERROR: Timeslot not found.");
  }
}


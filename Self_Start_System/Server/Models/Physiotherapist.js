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
    // availableTimeSlots: []
    availableTimeSlots: [{
		    startDate: Date,
        endDate: Date
    }],
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
    splitTimeSlotDueToAppointment:splitTimeSlotDueToAppointment
};

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
  // Initialize with one time slot
  newAvailableTimeSlot.push(document.availableTimeSlots[0]);

  for (let slot of document.availableTimeSlots) {

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
          if (error) {
            reject(error);
          } else {
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
        });
      }
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
          // Create a new event based on the appointment end to the prev end
          document.availableTimeSlots.push({
            startDate: appointmentEnd,
            endDate: event.endDate
          });

          // endTime is now the appointment's start time
          event.endDate = appointmentStart;

          console.log("event After update", event);

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
  });
}





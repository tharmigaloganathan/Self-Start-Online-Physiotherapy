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
		    slotId: String,
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
    addFreeTimeSlot:addFreeTimeSlot
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

function addFreeTimeSlot(id, body){
  return new Promise (function (resolve, reject) {
      console.log(body);
      if (!body.startDate){
        error = "No startDate detected.";
        reject(error);
      } else if (!body.endDate){
      error = "No endDate detected.";
      reject(error);
    } else if (!body.slotId){
      error = "No slotId detected.";
      reject(error);
    } else {

        Physiotherapists.findById(id, function (error, document) {
          if (error) {
            reject(error);
          } else {
            document.availableTimeSlots.push({
              slotId: body.slotId,
              startDate: body.startDate,
              endDate: body.endDate
            });

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

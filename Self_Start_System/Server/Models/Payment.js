var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: {
            type: Date,
            // `Date.now()` returns the current unix timestamp as a number
            default: Date.now
        },
        amount: Number,
        note: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Payments = module.exports = mongoose.model('Payment', paymentsSchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
  getAllByPatientProfileID:getAllByPatientProfileID
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Payments.findById(id, function (error, document) {
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
        if (!updatedDocument.amount){
            error = "No amount detected.";
            reject(error);
        } else if (!updatedDocument.note){
            error = "No note detected.";
            reject(error);
        } else {
            Payments.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                  if (updatedDocument.dayTimeStamp){
                    document.dayTimeStamp = updatedDocument.dayTimeStamp;
                  }
                    document.amount = updatedDocument.amount;
                    document.note = updatedDocument.note;
                  if (updatedDocument.patientProfile){
                    document.patientProfile = updatedDocument.patientProfile;
                  }

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
        Payments.findById(id, function (error, document) {
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
        Payments.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}

function getAllByPatientProfileID(patientProfileID){
    return new Promise ((resolve, reject) => {
      Payments.find({}, function (error, documents) {
        console.log("getAllByPatientProfileID ", documents);
        if (error){
          reject(error);
        }else{
          let paymentsList = [];
          for(let document of documents){
            if (document.patientProfile.toString() === patientProfileID.toString())
              paymentsList.push(document);
          }
          resolve(paymentsList);
        }
      });
    });
};

function add(object){
    return new Promise (function (resolve, reject) {
        var document = new Payments(object);
        if (!document.amount){
            error = "No amount detected.";
            reject(error);
        } else if (!document.note){
            error = "No note detected.";
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


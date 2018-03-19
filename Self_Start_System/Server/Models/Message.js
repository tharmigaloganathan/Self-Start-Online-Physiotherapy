var mongoose = require ('mongoose');
var messageSchema = mongoose.Schema(
    {
        patientID: String,
        physioID: String,
        message: String,
        seenByPhysio: Boolean,
        seenByPatient: Boolean,
        sender: String,
        time: {
            type: Date,
            default: Date.now
        }
    }
);

var Messages = module.exports = mongoose.model('Message', messageSchema);

module.exports = {
    getAll:getAll,
    add:add,
    update:update
};

function getAll(){
    return new Promise (function (resolve, reject) {
        Messages.find({}, function (error, documents) {
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
        var document = new Messages(object);
        if (!document.message){
            error = "No message detected.";
            reject(error);
        } else if (!document.patientID){
            error = "No patientID detected.";
            reject(error);
        } else if (!document.physioID){
            error = "No physioID detected.";
            reject(error);
        } else if (!document.sender){
            error = "No sender detected.";
            reject(error);
        }  else {
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

function update(id, updatedDocument){
    return new Promise (function (resolve, reject) {
        Messages.findById(id, function (error, document) {
            if (error) {
                reject(error);
            }
            else {
                if (updatedDocument.seenByPhysio){
                    document.seenByPhysio = updatedDocument.seenByPhysio;
                } else if (updatedDocument.seenByPatient){
                    document.seenByPatient = updatedDocument.seenByPatient;
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
    });
}

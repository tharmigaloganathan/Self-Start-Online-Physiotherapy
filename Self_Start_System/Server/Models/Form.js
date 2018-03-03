var mongoose = require ('mongoose');
var formsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        questionOrders: [{type: mongoose.Schema.ObjectId, ref: 'QuestionOrder'}],
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTest'}]
    }
);

var Forms = module.exports = mongoose.model('Form', formsSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Forms.findById(id, function (error, document) {
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
        if (!updatedDocument.name){
            error = "No name detected.";
            reject(error);
        } else if (!updatedDocument.description){
            error = "No description detected.";
            reject(error);
        } else {
            Forms.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.description = updatedDocument.description;
                    document.questionOrders = updatedDocument.questionOrders;
                    document.administrator = updatedDocument.administrator;
                    document.assessmentTests = updatedDocument.assessmentTests;
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
        Forms.findById(id, function (error, document) {
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
        Forms.find({}, function (error, documents) {
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
        var document = new Forms(object);
        if (!document.name){
            error = "No name detected.";
            reject(error);
        } else if (!document.description){
            error = "No description detected.";
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



var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        questionType: String,
        form: [{type: mongoose.Schema.ObjectId, ref: 'Form'}],
        answerChoices: [String],
        range: Number
    }
);

var Questions = module.exports = mongoose.model('Question', questionsSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
    updateManyOnFormDelete:updateManyOnFormDelete
};


function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Questions.findById(id, function (error, document) {
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
        if (!updatedDocument.questionText){
            error = "No questionText detected.";
            reject(error);
        } else if (!updatedDocument.helpDescription){
            error = "No helpDescription detected.";
            reject(error);
        } else {
            Questions.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    console.log("This is what the question is like:", updatedDocument);
                    document.questionText = updatedDocument.questionText;
                    document.helpDescription = updatedDocument.helpDescription;
                    document.questionType = updatedDocument.questionType;
                    document.form = updatedDocument.form;
                    document.answerChoices = updatedDocument.answerChoices;
                    document.range = updatedDocument.range;
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
        Questions.findById(id, function (error, document) {
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
        Questions.find({}, function (error, documents) {
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
        var document = new Questions(object);
        if (!document.questionText){
            error = "No questionText detected.";
            reject(error);
        } else if (!document.helpDescription){
            error = "No helpDescription detected.";
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

//below removes all FKs of a form that has been deleted
function updateManyOnFormDelete(form_id){
    return new Promise (function (resolve, reject) {
        Questions.update( {},
            { $pull: { form: form_id } },
            { multi: true },
            function(error, documents){
                if(error){
                    reject(error);
                } else {
                    resolve(documents);
                }
            }
        );
        console.log("finished the updateManyOnFormDelete fn", form_id);
    });
}

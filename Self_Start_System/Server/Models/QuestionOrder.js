var mongoose = require ('mongoose');
var questionOrderSchema = mongoose.Schema(
    {
        questionOrder: Number,
        question: {type: mongoose.Schema.ObjectId, ref: ('Question')},
        form: {type: mongoose.Schema.ObjectId, ref: 'Form'}
    }
);

var QuestionOrder = module.exports = mongoose.model('QuestionOrder', questionOrderSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        QuestionOrder.findById(id, function (error, document) {
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
        if (!updatedDocument.questionOrder){
            error = "No questionOrder detected.";
            reject(error);
        } else {
            QuestionOrder.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.questionOrder = updatedDocument.questionOrder;
                    document.exercise = updatedDocument.exercise;
                    document.form = updatedDocument.form;
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
        QuestionOrder.findById(id, function (error, document) {
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
        QuestionOrder.find({}, function (error, documents) {
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
        var document = new QuestionOrder(object);
        if (!document.questionOrder){
            error = "No questionOrder detected.";
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



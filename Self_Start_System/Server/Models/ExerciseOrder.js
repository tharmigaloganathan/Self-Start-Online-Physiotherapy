var mongoose = require ('mongoose');
var exerciseOrderSchema = mongoose.Schema(
    {
        exerciseOrder: Number,
        exercise: {type: mongoose.Schema.ObjectId, ref: ('Exercise')},
        rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlan'}
    }
);

var ExerciseOrder = module.exports = mongoose.model('ExerciseOrder', exerciseOrderSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        ExerciseOrder.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (err) {
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
        if (!updatedDocument.exerciseOrder){
            error = "No exerciseOrder detected.";
            reject(error);
        } else {
            ExerciseOrder.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.exerciseOrder = updatedDocument.exerciseOrder;
                    document.exercise = updatedDocument.exercise;
                    document.rehabilitationPlan = updatedDocument.rehabilitationPlan;
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
        ExerciseOrder.findById(id, function (error, document) {
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
        ExerciseOrder.find({}, function (error, documents) {
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
        var document = new ExerciseOrder(object);
        if (!document.exerciseOrder){
            error = "No exerciseOrder detected.";
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



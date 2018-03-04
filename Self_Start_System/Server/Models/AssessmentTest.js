var mongoose = require ('mongoose');
var assessmentTestsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}],
        form: {type: mongoose.Schema.ObjectId, ref: 'Form'},
        testResults: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
        rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlan'}
    }
);

var AssessmentTests = module.exports = mongoose.model('AssessmentTest', assessmentTestsSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};


function deleteOne(id){
    return new Promise (function (resolve, reject) {
        AssessmentTests.findById(id, function (error, assessmentTest) {
            if (error){
                reject(error);
            }else{
                assessmentTest.remove(function (error) {
                    if (error){
                        reject(error);
                    } else {
                        resolve(assessmentTest);
                    }
                })
            }
        });
    });
}

function update(id, updatedAssessmentTest){
    return new Promise (function (resolve, reject) {
        if (!updatedAssessmentTest.name){
            error = "No name detected.";
            reject(error);
        } else if (!updatedAssessmentTest.description){
            error = "No description detected.";
            reject(error);
        } else if (!updatedAssessmentTest.authorName){
            error = "No authorName detected.";
            reject(error);
        } else {
            AssessmentTests.findById(id, function (error, assessmentTest) {
                if (error) {
                    reject(error);
                }
                else {
                    assessmentTest.name = updatedAssessmentTest.name;
                    assessmentTest.description = updatedAssessmentTest.description;
                    assessmentTest.authorName = updatedAssessmentTest.authorName;
                    assessmentTest.recommendations = updatedAssessmentTest.recommendations;
                    assessmentTest.form = updatedAssessmentTest.form;
                    assessmentTest.testResults = updatedAssessmentTest.testResults;
                    assessmentTest.rehabilitationPlan = updatedAssessmentTest.rehabilitationPlan;
                    assessmentTest.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(assessmentTest);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        AssessmentTests.findById(id, function (error, assessmentTest) {
            if (error){
                reject(error);
            }else{
                resolve(assessmentTest);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        AssessmentTests.find({},function (error, assessmentTests) {
            if (error){
                reject(error);
            }else{
                resolve(assessmentTests);
            }
        });
    });
}

function add(assessmentTest){
    return new Promise (function (resolve, reject) {
        var assessment = new AssessmentTests(assessmentTest);
        if (!assessment.name){
            error = "No name detected.";
            reject(error);
        } else if (!assessment.description){
            error = "No description detected.";
            reject(error);
        } else if (!assessment.authorName){
            error = "No authorName detected.";
            reject(error);
        } else {
            assessment.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(assessment);
                }
            });
        }
    });
}


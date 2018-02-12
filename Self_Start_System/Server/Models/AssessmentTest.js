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
                assessmentTest.remove(function (err) {
                    if (err){
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
            err = "No name detected.";
            reject(err);
        } else if (!updatedAssessmentTest.description){
            err = "No description detected.";
            reject(err);
        } else if (!updatedAssessmentTest.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!updatedAssessmentTest.recommendations){
            err = "No recommendations detected.";
            reject(err);
        } else if (!updatedAssessmentTest.form){
            err = "No form detected.";
            reject(err);
        } else if (!updatedAssessmentTest.testResults){
            err = "No testResults detected.";
            reject(err);
        } else if (!updatedAssessmentTest.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
            reject(err);
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
            err = "No name detected.";
            reject(err);
        } else if (!assessment.description){
            err = "No description detected.";
            reject(err);
        } else if (!assessment.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!assessment.recommendations){
            err = "No recommendations detected.";
            reject(err);
        } else if (!assessment.form){
            err = "No form detected.";
            reject(err);
        } else if (!assessment.testResults){
            err = "No testResults detected.";
            reject(err);
        } else if (!assessment.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
            reject(err);
        } else {
            assessment.save(function (error) {
                if (error){
                    reject(err);
                }else{
                    resolve(assessment);
                }
            });
        }
    });
}


const Gender = require('../Models/Gender');

module.exports = function (router) {

    //get all genders
    router.get('/gender', function (req, res) {
        Gender.find({}, function (err, genders) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all genders
                res.json({
                    success: true,
                    message: 'Success! Retrieved all genders',
                    genders: genders
                })
            }
        })
    });

    return router;
};

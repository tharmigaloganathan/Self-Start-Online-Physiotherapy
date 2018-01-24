const Recommendation = require('../models/recommendation');

module.exports = function (router){

    router.get('/recommendation/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Recommendation.findOne({recommendationID: req.params.recommendationID}, function (err, recommendation) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({
                        success: true,
                        message: 'Success!',
                        recommendation: recommendation
                    })
                }
            })
        }
    })

}

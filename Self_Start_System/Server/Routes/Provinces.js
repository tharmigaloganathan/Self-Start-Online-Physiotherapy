const Province = require('../Models/Province');

module.exports = function (router) {

    //get all provinces
    router.get('/', function (req, res) {
        Province.find({}, function (err, provinces) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all provinces
                res.json({
                    success: true,
                    message: 'Success! Retrieved all provinces',
                    provinces: provinces
                })
            }
        })
    });

    return router;
};

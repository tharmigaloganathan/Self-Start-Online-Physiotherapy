const Country = require('../Models/Country');

module.exports = function (router) {

    //get all countries
    router.get('/country', function (req, res) {
        Country.find({}, function (err, countries) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all countries
                res.json({
                    success: true,
                    message: 'Success! Retrieved all countries',
                    countries: countries
                })
            }
        })
    });
};
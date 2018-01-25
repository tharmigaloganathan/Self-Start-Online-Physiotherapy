const City = require('../Models/City');

module.exports = function (router) {
    router.post('/city', function (req, res) {
        if (!req.body.cityName){
            res.json({success: false, message: "No city name detected."});
        } else {

            //create a new patientProfile instance to be saved
            var city = new City({
                name: req.body.cityName
            });

            //save it
            city.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "city saved!"});
                }
            })
        }
    });
};
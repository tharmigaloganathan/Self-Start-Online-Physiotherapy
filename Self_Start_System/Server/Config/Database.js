//for jwt webtokens
var crypto;
try {
    crypto = require('crypto').randomBytes(256).toString('hex');
} catch (err) {
    console.log('crypto support is disabled!');
}

module.exports = {
    uri: 'mongodb://SE3350Testing:ademidun@ds111648.mlab.com:11648/se3350testing',
    apiUrl: 'http://localhost:3700',
    secret: crypto
}
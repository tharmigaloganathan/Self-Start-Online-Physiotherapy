const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/local',
    apiUrl: 'http://localhost:4000',
    secret: crypto
}
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://127.0.0.1:27017/angular-2', // Databse URI and database name
    secret: crypto,
    db: 'mean-angular-2'

}
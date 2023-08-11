const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    try {

        const token = req.headers.authorization // It will look for token in headers
        const verify = jwt.verify(token, process.env.SECRET_KEY); // verify token
        req.id = verify.id   // store user ref id
        next();
    }
    catch {
        res.send("authentication failed");  // error
    }

}

module.exports = auth;
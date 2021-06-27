const express = require('express');
require('dotenv').config();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const router = express.Router();

const controllers = require('../controllers/users');

const requireAuth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-kcs-n29r.au.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://digitalfunnel/',
    issuer: 'https://dev-kcs-n29r.au.auth0.com/',
    algorithms: ['RS256'],
});

router.get('/', (req, res) => {
    res.send('hello from routes folder');
});

router.get('/other', (req, res) => {
    res.send('hello from other route!');
});

router.get('/user', requireAuth, controllers.getUser);
router.post('/adduser', controllers.addUser);

module.exports = router;

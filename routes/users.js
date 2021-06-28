const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

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

router.get('/user', requireAuth, jwtAuthz(['write:data']), controllers.getUser);
router.post('/adduser', controllers.addUser);

module.exports = router;

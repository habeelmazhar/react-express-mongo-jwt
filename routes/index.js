var express = require('express');
var router = express.Router();

var User = require('../models/user');

var Auth = require('./auth/auth');
var TokenSign = require('./auth/tokensign');

/* GET home page. */
router.get('/', Auth, function (req, res, next) {
    console.log('ok');
    res.json({ msg: 'ok' });
});

/* GET home page. */
router.post('/login', function (req, res, next) {
    console.log('email: ', req.body.email);
    console.log('password: ', req.body.password);
    console.log('club: ', req.body.club);

    User.findOne({ email: req.body.email, password: req.body.password }).then(doc => {
        if (doc) {
            console.log(doc);
            let token = TokenSign(doc._id);
            console.log(token);
            res.json({
                status: 'success',
                msg: 'Successfully logged In',
                data: { token: token, user: doc }
            });
        }
        else {
            res.json({ status: 'failed', msg: 'Username / Password not found', data: { token: null } });
        }
    }).catch(err => {
        console.log(err);
        res.json({ status: 'failed', msg: err });
    });

});


router.get('/logout', function (req, res) {
    req.session.destroy();
});
module.exports = router;

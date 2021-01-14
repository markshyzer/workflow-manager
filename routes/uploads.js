var express = require('express');
var router = express.Router();
let usersCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    console.log('file', req.params.id)
    res.redirect('/jobs')
});


module.exports = router;

var express = require('express');
var router = express.Router();
let usersCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/', usersCtrl.showAllUsers);
router.get('/:id', usersCtrl.showUserDetail);
router.get('/:id/edit', usersCtrl.editUser);
router.put('/', usersCtrl.updateUser)

module.exports = router;

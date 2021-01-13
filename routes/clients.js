var express = require('express');
var router = express.Router();
let clientsCtrl = require('../controllers/clients')


router.get('/', clientsCtrl.showAllClients);
router.get('/new', clientsCtrl.newClient); 
router.get('/:id/edit', clientsCtrl.editClient);
router.post('/', clientsCtrl.create);
router.get('/:id', clientsCtrl.showClientDetail);
router.put('/', clientsCtrl.updateClient)



module.exports = router;

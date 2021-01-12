var express = require('express');
var router = express.Router();
let jobsCtrl = require('../controllers/jobs')

/* GET users listing. */
router.get('/', jobsCtrl.showAllJobs);
router.get('/new', function (req, res, next) {
    res.render('jobs/new')
})
router.get('/:id', jobsCtrl.showJobDetail);
router.get('/:id/edit', jobsCtrl.editJob);
router.post('/', jobsCtrl.create)
router.put('/', jobsCtrl.updateJob)


module.exports = router;

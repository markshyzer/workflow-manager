let Job = require('../models/jobs')
let Client = require('../models/clients')
let User = require('../models/users')

function newJob(req, res, next) {
    Client.find({}, '_id companyName', function (err, clientIds) {
        console.log('All client Ids: ', clientIds);
        res.render('jobs/new', {clientIds, user: req.user})
    })
}

function create(req, res, next) {
    console.log('New job', req.body)
    console.log('File', req.file)
    let job = new Job(req.body);
    job.source = req.file.originalname
    job.fileName = req.file.filename
    job.fileType = req.file.mimetype
    job.filePath = req.file.path
    job.fileSize = req.file.size
    console.log('job', job)
    job.save(function(err){
        if (err) return(res.send(err));
        res.redirect('/jobs')
    })
}

function showAllJobs(req, res, next) {
    if (req.user.admin === true) {
    Job.find({})
    .populate('client', 'companyName') 
    .populate('assignedTo', 'email')
    .exec (function(err, jobs) {
        // console.log('All jobs:', jobs)
        res.render('jobs/jobs', {jobs, user: req.user})
    })
} else {
    console.log('Finding jobs assigned to user', req.user._id)
    Job.find({assignedTo: req.user._id})
    .populate('client', 'companyName') 
    .populate('assignedTo', 'email')
    .exec (function(err, jobs) {
        console.log('All jobs:', jobs)
        res.render('jobs/jobs', {jobs, user: req.user})
    })
}
}

function showJobDetail (req, res, next) {
    let id = req.params.id
    Job.findById(id) 
    .populate('client', 'companyName') 
    .populate('assignedTo', 'email')
    .exec (function(err, jobs) {
        // console.log('User', user)
        res.render('jobs/detail', {jobs, user: req.user})
    })
}

function editJob (req, res, next) {
    let id = req.params.id
    Job.findById(id, function(err, job) {
        Client.find({}, '_id companyName', function (err, clientIds) {
            User.find({}, '_id email', function (err, userlist) {
                console.log('User list:', userlist)
                res.render('jobs/edit', {job, clientIds, userlist, user: req.user})
            })
        })
    })
}

function updateJob (req, res, next) {
    let id = req.body.id
    Job.findById(id, function(err, job){
        console.log('I found: ', job)
        console.log('I want to put: ', req.body)
        job = Object.assign(job, req.body)
        // job.source = req.body.source
        console.log('job is now ', job)
        job.save(function(err){
            if (err) return(res.send(err));
            // console.log(job)
            res.redirect('/jobs')
        })
    })
}

function deleteJob (req, res, next) {
    Job.deleteOne({ _id: req.params.id}, function (err, job) {
        console.log('Gonna delete', job)
        res.redirect('/jobs')
    })
}



module.exports = {
    create,
    showAllJobs,
    showJobDetail,
    editJob,
    updateJob,
    newJob,
    deleteJob 
}
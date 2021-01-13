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
    let job = new Job(req.body);
    job.save(function(err){
        if (err) return(res.send(err));
        console.log(job)
        res.redirect('/jobs')
    })
}

function showAllJobs(req, res, next) {
    if (req.user.admin === true) {
    Job.find({})
    .populate('client', 'companyName') 
    .populate('assignedTo', 'email')
    .exec (function(err, jobs) {
        console.log('All jobs:', jobs)
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

    // Job
	// .findById(id) // find the cheese to edit
	// .then(job => {
	//     job.source = 'Cheddar' // update the cheese's properties
    //     return job.save() // save the cheese
	// })



    // Job.findById(id)
    // .then(job => {
    //     job = req.body
    //     return job.save()
    // })
    


}


// Flights.find({}, function(err, flights) {
//     console.log('My flights:', flights)  
//     res.render('flights', {flights})
//   })

module.exports = {
    create,
    showAllJobs,
    showJobDetail,
    editJob,
    updateJob,
    newJob
}
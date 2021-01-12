let Job = require('../models/jobs')

function create(req, res, next) {
    let job = new Job(req.body);
    job.save(function(err){
        if (err) return(res.send(err));
        console.log(job)
        res.redirect('/jobs')
    })
}

function showAllJobs(req, res, next) {
    Job.find({}, function(err, jobs) {
        // console.log('All jobs:', jobs)
        res.render('jobs/jobs', {jobs})
    })
}

function showJobDetail (req, res, next) {
    let id = req.params.id
    Job.findById(id, function(err, jobs) {
        // console.log('User', user)
        res.render('jobs/detail', {jobs})
    })
}

function editJob (req, res, next) {
    let id = req.params.id
    Job.findById(id, function(err, job) {
        console.log('Job: ', job)
        res.render('jobs/edit', {job})
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
    updateJob
}
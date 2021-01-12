let User = require('../models/users')

function showAllUsers (req, res, next) {
    User.find({}, function(err, user) {
        console.log('All jobs:', user)
        res.render('users/users', {user})
    })
}

function showUserDetail (req, res, next) {
    let id = req.params.id
    User.findById(id, function(err, user) {
        // console.log('User', user)
        res.render('users/detail', {user})
    })
}

function editUser (req, res, next) {
    // res.send(req.params.id)
    console.log('user id:', req.params.id)
    let id = req.params.id
    User.findById(id, function(err, users) {
        console.log('Job: ', users)
        res.render('users/edit', {users})
    })
}

function updateUser (req, res, next) {
    let id = req.body.id
    console.log('Userr ID:', req.body.id)
    User.findById(id, function(err, users){
        console.log('I found: ', users)
        console.log('I want to put: ', req.body)
        users = Object.assign(users, req.body)
        // job.source = req.body.source
        console.log('user is now ', users)
        users.save(function(err){
            if (err) return(res.send(err));
            // console.log(job)
            res.redirect('/users')
        })
    })
}

module.exports = {
    showAllUsers,
    showUserDetail,
    updateUser,
    editUser
}
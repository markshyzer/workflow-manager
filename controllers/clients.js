let Client = require('../models/clients')

function create(req, res, next) {
    let client = new Client(req.body);
    client.save(function(err){
        if (err) return(res.send(err));
        console.log(client)
        res.redirect('/clients')
    })
}

function newClient(req, res, next) {
    res.render('clients/new', {user: req.user})
}

function showAllClients(req, res, next) {
    Client.find({}, function(err, clients) {
        // console.log('All clients:', client)
        res.render('clients/clients', {clients, user: req.user})
    })
}

function showClientDetail (req, res, next) {
    let id = req.params.id
    Client.findById(id, function(err, clients) {
        // console.log('User', user)
        res.render('clients/detail', {clients, user: req.user})
    })
}

function editClient (req, res, next) {
    let id = req.params.id
    Client.findById(id, function(err, clients) {
        console.log('Job: ', clients)
        res.render('clients/edit', {clients, user: req.user})
    })
}

function updateClient (req, res, next) {
    let id = req.body.id
    Client.findById(id, function(err, clients){
        console.log('I found: ', clients)
        console.log('I want to put: ', req.body)
        clients = Object.assign(clients, req.body)
        // job.source = req.body.source
        console.log('client is now ', clients)
        client.save(function(err){
            if (err) return(res.send(err));
            // console.log(job)
            res.redirect('/clients')
        })
    })
}


module.exports = {
    create,
    showAllClients,
    showClientDetail,
    updateClient,
    editClient,
    newClient

}
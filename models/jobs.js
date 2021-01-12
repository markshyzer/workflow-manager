const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema ({
    source: String,
    sourceDocuments: String,
    client: String,
    dueDate: Date,
    service: String,
    speed: String,
    rate: Number,
    fileLength: Number,
    lengthAdjustment: Number,
    clientNotes: String,
    assignedTo: mongoose.Types.ObjectId,
    completedBy: mongoose.Types.ObjectId,
    privateNotes: String,
    interimDueDate: Date,
    billingNotes: String,
    projcet: String,
    createdDate: Date,
    assignedDate: Date,
    completedDate: Date
})

module.exports = mongoose.model('Job', jobSchema)
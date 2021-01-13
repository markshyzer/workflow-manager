const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema ({
    source: String,
    sourceDocuments: { type: String, default: null},
    status: {type: String, default: 'Incomplete'},
    client: { type: mongoose.Types.ObjectId, ref: 'Client' },
    dueDate: String,
    service: {type: String, enum: ['transcribe', 'caption'] },
    speed: {type: String, enum: ['rush', 'regular', 'super rush'], default: 'regular' },
    rate: Number,
    fileLength: Number,
    lengthAdjustment: { type: Number, default: 0 },
    clientNotes: String,
    assignedTo: { type: mongoose.Types.ObjectId, ref: 'User', default: '5ffcbe9916b4883c3058e2f6' },
    completedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    privateNotes: String,
    interimDueDate: Date,
    billingNotes: String,
    projcet: String,
    createdDate: { type: Date, default: Date.now },
    assignedDate: Date,
    completedDate: Date
})

module.exports = mongoose.model('Job', jobSchema)


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    date_created: {type: Date, required : true},
    lead_contributor: {type: String, required: false},
    backup_contributor: {type: String, required: false},
    description: {type: String, required: true}
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
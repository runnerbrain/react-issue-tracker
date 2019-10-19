const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required: true},
        comment: String,
        created_at: {type: Date, Default: Date.now}
},
{_id: true})

const Comment = mongoose.model('Comment',commentSchema);

const issueSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    date_created: {type: Date, required : true},
    lead_contributor: {type: String, required: false},
    backup_contributor: {type: String, required: false},
    description: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]

})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
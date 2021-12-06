const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Blog Title is required',
        trime: true
    },
    body: {
        type: String,
        required: ' Blog Body is required',
        trim: true
    },
    authorId: {
        required: 'Author is required',
        type: mongoose.Types.ObjectId,
        refs: 'Author'
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        trim: true,
        required: 'Blog Category is required'
    },
    subcategory: {
        type: String,
        trim: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    DeletedAt: {
        type: Date,
        default: null
    },
}, { timestamps: true })

module.exports = mongoose.model('blog', blogSchema)
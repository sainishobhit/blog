const mongoose = require('mongoose')
const { validator } = require('../utils')
const { systemConfig } = require('../configs')

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'First Name is required',
        trim: true
    },
    lname: {
        type: String,
        required: 'Last Name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: ' Email Address is Required',
        validate: { validator: validator.validateEmail, message: 'Please enter a valid Email Address', isAsync: false },
        match: [validator.emailRegex, 'Please Fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is Required'
    }
}, { timestamps: true })

module.exports = mongoose.model('Author', authorSchema, 'authors')
const mongoose = require('mongoose')
const { validator, jwt } = require('../utils')
const { systemConfig } = require('../configs')
const { authorModel } = require('../models')

const registerAuthor = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide details' })
            return
        }

        const { fname, lname, title, email, password } = requestBody;

        if (!validator.isValid(fname)) {
            res.status(400).send({ status: false, message: 'first name is required' })
            return
        }

        if (!validator.isValid(lname)) {
            res.status(400).send({ status: false, message: 'last name is required' })
            return
        }

        if (!validator.isValid(title)) {
            res.status(400).send({ status: false, message: 'title is required' })
            return
        }

        if (!validator.isValidTitle(title)) {
            res.status(400).send({ status: false, message: `Title should be among ${systemConfig.titleEnumArray.join(', ')}` })
            return
        }

        if (!validator.isValid(email)) {
            res.status(400).send({ status: false, message: 'email is required' })
            return
        }

        if (!validator.validateEmail(email)) {
            res.status(400).send({ status: false, message: 'email is invalid' })
            return
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: 'password is required' })
            return
        }

        const isEmailAlreadyUsed = await authorModel.findOne({ email });

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} is already registered` })
            return
        }

        const authorData = { fname, lname, title, email, password }
        const newAuthor = await authorModel.create(authorData);

        res.status(201).send({ status: true, message: `Author created successfully`, data: newAuthor })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const loginAuthor = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide details' })
            return
        }

        const { email, password } = requestBody;

        if (!validator.isValid(email)) {
            res.status(400).send({ status: false, message: 'email is required' })
            return
        }

        if (!validator.validateEmail(email)) {
            res.status(400).send({ status: false, message: 'email is invalid' })
            return
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: 'password is required' })
            return
        }

        const author = await authorModel.findOne({ email, password });

        if (!author) {
            res.status(401).send({ status: false, message: `Invalid Login Credentials` })
            return
        }

        const token = await jwt.createToken({ authorId: author._id });
        res.header('x-api-key', token);
        res.status(200).send({ status: true, message: 'Author Login Successfull', data: { token } });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {
    registerAuthor, loginAuthor
}
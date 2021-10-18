const { jwt } = require('../utils')

const authorAuth = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if (!token) {
            res.status(403).send({ status: false, message: `Missing Authentication token in request` })
            return;
        }

        const decoded = await jwt.verifyToken(token);

        if (!decoded) {
            res.satus(403).send({ status: false, message: `Invalid Authentication in request` })
            return;
        }

        req.authorId = decoded.authorId

        next()


    } catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = authorAuth
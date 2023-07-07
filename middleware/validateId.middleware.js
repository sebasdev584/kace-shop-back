const ObjectId = require('mongoose').Types.ObjectId

const isValidId = (req, res, next) => {
    const { id = '' } = req.params
    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "El id proporcionado no es válido" })
        }

        next()
    } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error inesperado", error: error.message })
    }
}

module.exports = isValidId
const mongoose = require('mongoose')
const conection = {
    isConnected: false
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        conection.isConnected = true
    } catch (error) {
        console.error(error)
    }
}

const disconnect = async () => {
    if (conection.isConnected) {
        await mongoose.disconnect()
        conection.isConnected = false
    }
}

module.exports = { connect, disconnect }
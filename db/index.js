const mongoose = require('mongoose')
const conection = {
    isConnected: false
}

const connect = async () => {
    try {
        if (conection.isConnected === 1) {
            return
        }
        if (mongoose.connections.length > 0) {
            conection.isConnected = mongoose.connections[0].readyState

            if (conection.isConnected === 1) {
                return
            }
            await mongoose.disconnect()
        }

        await mongoose.connect(process.env.MONGOURI)
        conection.isConnected = true
    } catch (error) {
        console.error(error)
    }
}

const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return
    if (conection.isConnected === 0) return

    await mongoose.disconnect()
}

module.exports = { connect, disconnect }
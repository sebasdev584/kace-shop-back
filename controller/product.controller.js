const db = require('../db')
const ProductModel = require('../models/product.model')

const getAll = async () => {
    await db.connect()
    const products = await ProductModel.find()
    await db.disconnect()

    return products
}

const getProduct = async (id) => {
    await db.connect()
    const product = await ProductModel.findById(id)
    await db.disconnect()

    return product
}

const store = async (payload) => {
    const productModel = new ProductModel(payload)
    await db.connect()
    await productModel.save()
    await db.disconnect()
    return true
}

const update = async (id, payload) => {
    await db.connect()
    const product = await ProductModel.findByIdAndUpdate(id, payload, { new: true })
    await db.disconnect()
    return product
}

const deleteProduct = async (id) => {
    await db.connect()
    const productDeleted = await ProductModel.findByIdAndDelete(id)
    await db.disconnect()
    return productDeleted
}

module.exports = {
    store,
    getAll,
    update,
    deleteProduct,
    getProduct
}
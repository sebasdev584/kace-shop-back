const db = require('../db')
const ProductModel = require('../models/product.model')

const getAll = async () => {
    await db.connect()
    const products = await ProductModel.find()
    await db.disconnect()

    return products
}

const getProductsByStock = async () => {
    await db.connect()
    const products = await ProductModel.find({ product_stock: { $gt: 0 } })
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

const sellProduct = async (id, cant) => {
    await db.connect()
    const product = await ProductModel.findById(id)
    if (!product || +product.product_stock < +cant) {
        return false
    }
    const newStock = Math.ceil(+product.product_stock - +cant)
    product.product_stock = String(newStock)
    await product.save()
    await db.disconnect()
    return true
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
    getProductsByStock,
    update,
    deleteProduct,
    sellProduct,
    getProduct
}
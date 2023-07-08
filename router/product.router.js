const Router = require('./router')
const validateSchema = require('../middleware/validate.middleware')
const isValidId = require('../middleware/validateId.middleware')
const productSchema = require('../schema/product.schema')
const {
    store,
    update,
    deleteProduct,
    sellProduct,
    getAll,
    getProductsByStock,
    getProduct
} = require('../controller/product.controller')

Router.get('/products', async (req, res) => {
    try {
        const products = await getAll()
        res.status(200).json({ message: "Productos encontrados", products })
    } catch (error) {
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedidio', error: error.message })
    }
})

Router.get('/products/stock', async (req, res) => {
    try {
        const products = await getProductsByStock()
        res.status(200).json({ message: "Productos encontrados", products })
    } catch (error) {
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedidio', error: error.message })
    }
})

Router.get('/product/:id', isValidId, async (req, res) => {
    const { id } = req.params
    try {
        const product = await getProduct(id)
        if (!product) {
            return res.status(404).json({ message: "No se ha encontrado correo" })
        }

        res.status(200).json({ message: "Producto encontrado", product })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedido', error: error.message })
    }
})

Router.post('/product', validateSchema(productSchema), async (req, res) => {
    const data = req.body
    try {
        await store(data)
        res.status(201).json({ message: 'Datos guardados correctamente' })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedido', error: error.message })
    }
})

Router.get('/sell/:id/:cant', isValidId, async (req, res) => {
    const { id, cant } = req.params

    try {
        const selledProduct = await sellProduct(id, cant)
        if (!selledProduct) {
            return res.status(400).json({ message: "Producto no encontrado o cantidad inexistente" })
        }
        res.status(200).json({ message: 'Venta realizada con éxito' })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedido', error: error.message })
    }
})

Router.post('/update/:id', isValidId, async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const productUpdated = await update(id, data)
        if (!productUpdated) {
            return res.status(404).json({ message: 'No se ha encontrado el registro' })
        }
        res.status(200).json({ message: 'Registro actualizado correctamente', productUpdated })
    } catch (error) {
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedido', error: error.message })
    }
})

Router.post('/delete/:id', isValidId, async (req, res) => {
    const { id } = req.params
    try {
        const productDeleted = await deleteProduct(id)
        if (!productDeleted) return res.status(404).json({ message: 'Registro no encontrado' })
        res.status(200).json({ message: 'Registro eliminado con éxito' })
    } catch (error) {
        res.status(400).json({ message: 'Algo totalmente inesperado ha sucedido', error: error.message })
    }
})


module.exports = Router
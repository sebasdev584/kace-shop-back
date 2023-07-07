const app = require('./app')
const productRouter = require('./router/product.router')


app.listen(process.env.PORT)

app.use('/api', productRouter)
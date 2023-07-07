const z = require('zod')

const CreateProductSchema = z.object({
    product_name: z.string({
        required_error: "El nombre del producto es obligatorio"
    }).min(3, "Error producto debe contener mínimo 3 caracteres"),
    product_reference: z.string({
        required_error: "La referencia del producto es obligatorio"
    }).min(3, "Error referencia debe contener mínimo 3 caracteres"),
    product_price: z.number({
        required_error: "El precio del producto es obligatorio"
    }).min(2, "Error el precio debe contener mínimo 3 caracteres")
        .positive('El precio debe ser un número positivo'),
    product_weight: z.number({
        required_error: "El peso del producto es obligatorio"
    }).min(1, "Error el peso debe contener mínimo 2 caracteres")
        .positive('El peso debe ser un número positivo'),
    product_category: z.string({
        required_error: "La categoría del producto es obligatoria"
    }).min(3, "Error categoría debe contener mínimo 3 caracteres"),
    product_stock: z.number({
        required_error: "El stock del producto es obligatorio"
    }).min(2, "Error el stock debe contener mínimo 2 caracteres")
        .positive('El stock debe ser un número positivo'),
})


module.exports = CreateProductSchema
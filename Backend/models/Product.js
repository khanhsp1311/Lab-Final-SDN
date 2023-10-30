import mongoose, { Schema } from "mongoose"

const Product = mongoose.model("Product", new Schema({
    name: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    images: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image', // Referencing the 'User' model
        },
        url: String,
        caption: String,
    }],
    comments: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Referencing the 'User' model
        },
    }],
    status: String,

},

));

export default Product

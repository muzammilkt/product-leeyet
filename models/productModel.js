const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image:{
        type:String,

    },
    name:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    barcode:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("product", productSchema )
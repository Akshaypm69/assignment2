const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = Schema({

    Name:{ type:String, required:true },
    Price:{ type:Number, required:true },
    Path:{ type:String }

})
module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = Schema({

    name:{ type:String, required:true},
    tags:{ type:String },

})
module.exports = mongoose.model('Product', productSchema)
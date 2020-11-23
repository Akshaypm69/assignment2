const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const info = new Schema({

    address1:{ type:String, required:true },
    address2:{ type:String, required:true },
    contact:{ type:Number, required:true }
})

module.exports = mongoose.model('Contactinfo', info );
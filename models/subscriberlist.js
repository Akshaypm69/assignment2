const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const sublist = new Schema({

    email: { type:String, required:true }

})

module.exports = mongoose.model('Subscriberlist', sublist)
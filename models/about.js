const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const About = new Schema({

    description:{ type:String, required:true }

})

module.exports = mongoose.model('About', About);
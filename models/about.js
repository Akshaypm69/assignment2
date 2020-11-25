const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const About = new Schema({

    image:{ type:String },
    description:{ type:String, required:true }

})

module.exports = mongoose.model('About', About);
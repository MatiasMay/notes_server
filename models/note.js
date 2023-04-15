// mongodb+srv://fullstack:<password>@cluster0.dgdjwrw.mongodb.net/?retryWrites=true&w=majority
require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongDB',error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note',noteSchema)
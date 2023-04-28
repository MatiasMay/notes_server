// mongodb+srv://fullstack:<password>@cluster0.dgdjwrw.mongodb.net/?retryWrites=true&w=majority
require('dotenv').config()
const config = require('../utils/config')
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note',noteSchema)
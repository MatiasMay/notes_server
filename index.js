require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()
const ObjectId = require('mongoose').Types.ObjectId;
app.use(cors())
app.use(express.json())


const requestLogger = (request,response, next) => {
    console.log('Method',request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---------------------------------------------');
    next()
}
app.use(requestLogger)

app.get('/', (request,response) => {
    response.send('<h1>Welcome to Notes API</h1>')
})

app.get('/api/notes',(request,response) => {
    Note.find({}).then(notes =>{
        response.json(notes)
    })
})

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

app.get('/api/notes/:id',(request, response) => {
    if (isValidObjectId(request.params.id)){
        Note.findById(request.params.id)
        .then(note => {
            note !== null ? response.json(note) : response.status(404).send()
        })
    }else{
        response.status(404).send()
    }
})

app.delete('/api/notes/:id', (request, response)=>{
    if (isValidObjectId(request.params.id)){
        Note.deleteOne({ _id : request.params.id})
            .then(result => {
              if(result.deletedCount > 0){
                response.status(204).send()
              }else{
                response.status(404).send()
              }
            })
    }else{
        response.status(404).send()
    }
})


app.put('/api/notes/:id',(request, response) => {
    const body = request.body;
    const noteUpdate = {
        content: body.content,
        important: body.important,
        date: body.date,
        id : body.id,
        _id : body._id,
    }

    if(isValidObjectId(request.params.id)){
        Note.findOneAndUpdate({ _id : request.params.id},noteUpdate)
          .then(
              result => {
              if(result !== null){
                  response.json(noteUpdate)
              }else{
                  response.status(404).send()
              }
              })
    }else{
        response.status(404).send()
    }
    })

app.post('/api/notes',(request, response) => {
    const body = request.body;
    console.log(body)
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
    
})

const unknownPath = (request,response) => {
    response.status(404).json({
        error: 'unknown Path'
    })
}

app.use(unknownPath)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

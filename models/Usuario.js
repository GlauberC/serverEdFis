const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        required: true
    },
    eAdmin:{
        type: Number,
        default: 0
    },
    senha: {
        type: String,
        required: true
    },
    bday:{
        type: Date,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    fezAvaliacao:{
        type: Boolean,
        required: true,
        default: false
    }
})

mongoose.model('usuarios', Usuario)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Avaliacao = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    }
})

mongoose.model('avaliacoes', Avaliacao)
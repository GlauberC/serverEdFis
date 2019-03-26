const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Avaliacao = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    ataqueCoracao:{
        type: Boolean,
        required: true
    },
    cirurgiaCardiaca:{
        type: Boolean,
        required: true
    },
    cateterismo:{
        type: Boolean,
        required: true
    },
    angioplastia:{
        type: Boolean,
        required: true
    },
    marcaPasso:{
        type: Boolean,
        required: true
    },
    doencaValvas:{
        type: Boolean,
        required: true
    },
    insuficienciaCardiaca:{
        type: Boolean,
        required: true
    },
    transplanteCoracao:{
        type: Boolean,
        required: true
    },
    doencaCardiaca:{
        type: Boolean,
        required: true
    },

    

    desconfortoToraxico:{
        type: Boolean,
        required: true
    },
    desconfortoRespiratorio:{
        type: Boolean,
        required: true
    },
    desmaios:{
        type: Boolean,
        required: true
    },
    medicacaoCoracao:{
        type: Boolean,
        required: true
    },



    diabetes:{
        type: Boolean,
        required: true
    },
    asma:{
        type: Boolean,
        required: true
    },
    queimacaoPerna:{
        type: Boolean,
        required: true
    },
    musculoEsqueleticos:{
        type: Boolean,
        required: true
    },
    medicacaoPrescrita:{
        type: Boolean,
        required: true
    },
    gravida:{
        type: Boolean,
        required: true
    },



    homem45:{
        type: Boolean,
        required: true
    },
    mulher55:{
        type: Boolean,
        required: true
    },
    fuma:{
        type: Boolean,
        required: true
    },
    pressaoArterialMaior:{
        type: Boolean,
        required: true
    },
    naoSabePressaoArterial:{
        type: Boolean,
        required: true
    },
    medicacaoPressaoArterial:{
        type: Boolean,
        required: true
    },
    colesterolMaior:{
        type: Boolean,
        required: true
    },
    sabeColesterol:{
        type: Boolean,
        required: true
    },
    parenteProximo:{
        type: Boolean,
        required: true
    },
    fisicamenteInativo:{
        type: Boolean,
        required: true
    },
    sobrepeso:{
        type: Boolean,
        required: true
    }
})

mongoose.model('avaliacoes', Avaliacao)
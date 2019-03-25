const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {eAdmin} = require('../helpers/eAdmin')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')




    router.get('/usuarios',eAdmin, (req, res) =>{
        Usuario.find({eAdmin: { $lt: '2' }}).sort({nome: 'desc'})
            .then( usuarios => res.render('admin/usuarios', {usuarios: usuarios}))
            .catch( err => {
                req.flash('error_msg', 'Houve um erro ao acessar a lista de usuarios')
                res.redirect('/')
            })
    })

    router.get('/usuario/edit/:id', eAdmin, (req, res) => {
        Usuario.findOne({_id: req.params.id})
            .then( usuario => {
                res.render('admin/editusuario', {usuario: usuario})
            })
            .catch( err => {
                req.flash('error_msg', 'Houve um erro interno ao editar o usuário')
                res.redirect('/admin/usuarios')
            })
    })
    router.post('/usuario/editar', eAdmin, (req, res) => {
        // Não foi feita a verificação do email
        Usuario.findOne({_id: req.body.id})
            .then( usuario => {
                usuario.nome = req.body.nome
                usuario.eAdmin = req.body.eAdmin
                usuario.save()
                    .then( () => {
                        req.flash('success_msg', 'Usuario editado com sucesso')
                        res.redirect('/admin/usuarios')
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Houve um erro ao editar o usuário')
                        res.redirect('/admin/usuarios')
                    })
            })
            .catch(err => {
                req.flash('error_msg', "Houve um erro ao achar o usuário no banco de dados")
                res.redirect('/admin/usuarios')
            })
    })
    router.post('/usuario/deletar', eAdmin, (req, res) => {
        Usuario.remove({_id: req.body.id})
            .then(() => {
                req.flash('success_msg', 'Usuario deletado com sucesso')
                res.redirect('/admin/usuarios')
            })
            .catch(err => {
                req.flash('error_msg','Houve um erro ao deletar o usuário')
                res.redirect('/admin/usuarios')
            })
    })

module.exports = router
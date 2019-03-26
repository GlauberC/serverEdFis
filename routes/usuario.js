const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registrar', (req, res) => {
    var erros = []
    if(!req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null ){
            erros.push({texto: "Nome inválido"})
    }

    if(!req.body.email ||
        typeof req.body.email == undefined ||
        req.body.email == null ){
            erros.push({texto: "E-mail inválido"})
    }

    if(!req.body.senha ||
        typeof req.body.senha == undefined ||
        req.body.senha == null ){
            erros.push({texto: "Senha inválida"})
    }
    if(!req.body.bday ||
        typeof req.body.bday == undefined ||
        req.body.bday == null ){
            erros.push({texto: "Data de nascimento inválida"})
    }

    if(!req.body.sexo ||
        typeof req.body.sexo == undefined ||
        req.body.sexo == null ){
            erros.push({texto: "Sexo inválido"})
    }

    if(!req.body.cpf ||
        typeof req.body.cpf == undefined ||
        req.body.cpf == null ){
            erros.push({texto: "CPF inválido"})
    }
    if(!/^\d{11}$/.test(req.body.cpf) && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(req.body.cpf)){
        erros.push({texto: "CPF inválido"})
    }

    if(req.body.senha.length < 6){
        
        erros.push({texto: "O campo senha deve ter pelo menos 6 caracteres"})
    }

    if(req.body.senha !== req.body.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente!"})
    }
    var nasci = new Date(req.body.bday)
    var hoje = new Date()
    if(nasci.getFullYear() < 1900 || nasci >= hoje){
        erros.push({texto: "Data Inválida"})
    }


    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email})
            .then( usuario => {
                if(usuario){
                    req.flash('error_msg', 'Já existe uma conta cadastrada com esse email no nosso sistema')
                    res.redirect('/usuarios/registro')
                }else{
                    // Cadastro de usuário
                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha,
                        bday: nasci,
                        sexo: req.body.sexo,
                        cpf: req.body.cpf.replace(/[\.\-]/ig,'')
                    })
                    // Encriptar senha
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                            if(erro){
                                req.flash('error_msg', 'Houve um erro durante o salvamento do usuário')
                                res.redirect('/')
                            }
                            novoUsuario.senha = hash
                            novoUsuario.save()
                                .then(() => {
                                    req.flash('success_msg', 'Usuário criado com sucesso')
                                    res.redirect('/')
                                })
                                .catch( err => {
                                    req.flash('error_msg', 'Houve um erro ao cadastrar o usuário, tente novamente')
                                    res.redirect('/usuarios/registro')
                                })
                        })
                    })
                }

            })
            .catch( err => {
                req.flash('error_msg', 'Houve um erro interno')
                res.redirect('/')
            })
    }
})
router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Deslogado com sucesso!')
    res.redirect('/')
})

// Autenticação 3/4
router.post('/loginusuario', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true

    })(req, res, next)
})

module.exports = router
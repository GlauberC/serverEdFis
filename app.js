// Carregando os módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require("path")
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const usuarios = require('./routes/usuario')
    const passport = require('passport')
    require('./config/auth')(passport)
    const db = require('./config/db')

// Configurações
    // Sessão
        app.use(session({
            secret: "serverparaappdeedfis",
            resave: true,
            saveUninitialized: true
        }))

        // Autenticação 2/4
        app.use(passport.initialize())
        app.use(passport.session())


        app.use(flash())

    // Middleware
        app.use( (req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            // Autenticação 4/4
            res.locals.error = req.flash('error')

            res.locals.user = req.user || null
            next()
        })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI, {useNewUrlParser: true})
        .then( () => console.log("MongoDB conectado"))
        .catch( err => console.log("Houve um erro ao se conectar ao mongoDB: " + err))

    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Rotas

    // Home

    app.get('/', (req,res) => {
        res.render('index')
    })

    app.get('/404', (req, res) =>{
        res.send('Erro 404!')
    })

    // Usuarios

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)
 
    

// Outros
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em localhost:${PORT}`))
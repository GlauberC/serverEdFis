if (process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: "mongodb+srv://Glauber:Admin123321@siteedfis-le69g.mongodb.net/test?retryWrites=true"}
    
}else{
    module.exports = {mongoURI: "mongodb://localhost/edfisdb"}
}
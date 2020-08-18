const express = require('express')
const server = express()
const nunjucks = require("nunjucks")
const format = require('./utils/format')

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClass
} = require("./pages")

//configurar Nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //desativo o cache

})


server
//receber os dados do body
.use(express.urlencoded({extended:true}))
.use(express.static("public"))//configuração do servidor para que ele observe a pasta public
//configuração da rota
.get("/", pageLanding)
    
.get("/study", pageStudy) 

.get("/give-classes", pageGiveClasses)
.post("/save-class", saveClass)

.listen(5500)/*numero da porta*/
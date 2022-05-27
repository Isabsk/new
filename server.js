const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://testdb:testdb@cluster0.6v96k.mongodb.net/Students',{useNewUrlParser: true} , {useUnifiedTopology: true})

const com = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    date: {type: String,
    default: new Date().toString()}
})

const save = mongoose.model("Student" , com )
/*let recive = new save({
        name: "Isab Sk",
        role: "front end dev"
    })
    recive.save()*/
 
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post("/", (req,res) => {
    let recive = new save({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    })
    recive.save()
    res.redirect('/')
    
})

app.get('/list', (req,res) => {
    save.find({}, function(err, students) {
        res.render('list', {
            details: students
        })
    })
})

app.listen(3000, () => {
console.log('running on port 3000')
})

var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser")
var path = require("path")


let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
 ]



 app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function (req, res) {
        console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
        res.sendFile(path.join(__dirname + "/static/index.html"))
        
    })

app.post("/login", function(req, res){
    if(req.body.mail=="" || req.body.nick==""){
        console.log("pustePola")
        res.sendFile(path.join(__dirname + "/static/index.html"))
        return;
    }

    var isIt=0;
    for(var i=0;i<users.length;i++){
        if(users[i].email == req.body.mail)
            isIt=1;
    }

    if(isIt==0){
        console.log(isIt)
        var obj={
            nick:req.body.nick,
            email:req.body.mail,
        }
        
        
        users.push(obj)
        console.log(users)
        res.sendFile(path.join(__dirname + "/static/index.html"))
    }else{
        res.send("Taki mail już jest w bazie!")
    }
        
        
    })

app.get("/removeUserByCheckbox", function (req, res) {

    console.log(users)
    let checkBox = ''
    for (var i=0;i<users.length;i++) {
        checkBox += '<div><input value="' + users[i].email + '" type="checkbox" name="delName" "' + users[i].email + '"> ' + users[i].email+'</div>'
    }
    let formularz = '<form method="POST" action="/delete"> <div style="display: flex; flex-direction: column;"> ' + checkBox + '</div><input type="submit" value="usuń"> </form>'
    res.send(formularz)
})

app.get("/removeUserBySelect", function (req, res) {

    console.log(users)
    let options = ''
    for (var i=0;i<users.length;i++) {
        options += '<option value="' + users[i].email + '" name="delName"> ' + users[i].email + ' </option> '
    }
    let formularz = '<form method="POST" action="/delete"><div style="display: flex; flex-direction: column;"><input style="width: 50px; margin-bottom: 6px" type="submit" value="usuń"> <select style="width: 100px;" name="delName"> ' + options + ' </select> </div> </form>'
    res.send(formularz)
})

app.get("/removeUserByRadio", function (req, res) {

    console.log(users)
    let radioButtons = ''
    for (var i=0;i<users.length;i++) {
        radioButtons += '<div><input value="' + users[i].email + '" type="radio" name="delName" "' + users[i].email + '"> ' + users[i].email+'</div>'
    }
    let formularz = '<form method="POST" action="/delete"> <div style="display: flex; flex-direction: column;"> ' + radioButtons + '</div><input type="submit" value="usuń"> </form>'
    res.send(formularz)
})

app.post('/delete', (req, res) => {

    var isArray=Array.isArray(req.body.delName);
    if(isArray){
        for(var i=0;i<req.body.delName.length;i++){
            users = users.filter(z => z.email !== req.body.delName[i])
        }
    }else{
        users = users.filter(z => z.email !== req.body.delName)
    }
    
    res.sendFile(path.join(__dirname + "/static/index.html"))
  })




app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})
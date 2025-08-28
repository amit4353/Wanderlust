const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname , "views"));

const sessionOption = {
    secret : "mysupersecretstring",
    resave : false, 
    saveUninitialized : true,
};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error","Error ☹️ : Please enter Name");
    } else {
        req.flash("success","User registered Successfully 😎");
    }
    res.redirect("/hello")
});

app.get("/hello",(req,res) => {
    res.render("page.ejs",{ name: req.session.name });
});


app.get("/reqcount" , (req,res) => {
    if (req.session.count){
        req.session.count++;
    } else{
        req.session.count = 1;
    }
    console.log(req.session.count)
    res.send(`you sent a req ${req.session.count} time`);
});


app.get("/test",(req,res) => {
    res.send("test successful");
});


app.listen(3000,() => {
    console.log("server is listing to 3000");
});


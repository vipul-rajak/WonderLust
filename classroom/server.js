const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));


const sessionOptions = { 
    secret: "mysupersecretstring", 
    resave:false, 
    saveUninitialized:true
};

app.use(session( sessionOptions));
app.use(flash());

app.use( (req,res,next) =>{
    res.locals.successMsg = req.flash(("success"));
    res.locals.errorMsg = req.flash(("error"));
    next();
})


app.get("/register", (req,res) =>{
    let { name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error", "some error occured !");
    }else{
         req.flash("success", "user register successfullly");
    }
   res.redirect("/hello");
})

app.get("/hello", (req,res) =>{
    res.render( "page.ejs", { name: req.session.name,});
});



// app.get("/reqcount", (req,res) =>{
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count =1
//     }
//     res.send(`Hi, You sent request ${req.session.count} times`);
// })

// app.get("/test", (req,res) =>{
//     res.send("test succesfull");
// })

app.listen( 3000 , () =>{
    console.log("server is connected");
});

















//  for cookie from line 6

// const cookieParser = require("cookie-parser");


// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req,res)=>{
//     res.cookie("MadeIn", "India" ,{ signed: true});
//     res.send("signedcookie");
// })

// app.get("/verify", (req,res) =>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req,res) =>{
//     res.cookie("greet", "namsate");
//     res.cookie("madeIn", "India");
//     res.send("sent you some cookie");
// })

// app.get("/greet", (req,res) =>{
//     let { name = "anonymous"} = req.cookies;
//     res.send(`Hi ${name}`);
// })

// app.get("/", (req,res) =>{
//     console.dir(req.cookies);
//     res.send("Hi i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

const passport = require('passport')
const express = require('express')
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/userModel')
const bcrypt = require("bcrypt");
const MongoStore = require('connect-mongo')
const url ='mongodb://localhost:27017/mydatabase'
initalizingPassport = (app) =>{
    app.use(
    session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge: 300000, // 5minutes
        secure: false,
        domain: "localhost",
        path: "/",
      },
      name: "gk",
      store: MongoStore.create({ mongoUrl: url }),
}))
app.use(passport.initialize());
app.use(passport.session());

        passport.use(
            new LocalStrategy(async(username,password,done)=>{
                const user = await User.findOne({
                    $or: [{ username: username }, { email: username }],
                  });
                try {
                    if(!user)
                    {
                        return done(null,false)
                    }
                    const hashed = await bcrypt.compare(password,user.password)
                    if(!hashed)
                    { 
                       return done(null,false)
                    }
                    return done(null,user)
                } catch (error) {
                    return done(error,false)
                }
               
            })
        )
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
      
        console.log("passport and sessions loaded")

        
}

module.exports = initalizingPassport
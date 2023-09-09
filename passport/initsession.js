const LocalStrategy = require('passport-local').Strategy
const express = require('express')
const User = require('../model/userModel')
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
const url ='mongodb://localhost:27017/mydatabase'
const MongoStore = require('connect-mongo')
initalizingPassport = (passport) =>{
    app.use(
    session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 300000, // 5minutes
      },
      name: "gk",
      store: MongoStore.create({ mongoUrl: url }),
}))
    app.use(passport.initialize());
    app.use(passport.session());
        passport.use(
            new LocalStrategy(async(username,password,done)=>{
                const user = await User.findOne({username});
                // app.use(session({secret:'secret',resave:false,saveUninitialized:false}))
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
        passport.serializeUser((user,done)=>{
            done(null,user.id)
        })
        passport.deserializeUser(async(id,done)=>{
            try {
                const user = await User.findById({id})
                done(null,user)
            } catch (error) {
                done(error,false)
            }

        })
}

module.exports = initalizingPassport
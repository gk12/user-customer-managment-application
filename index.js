require("./db/db")
const express = require("express")
const userroutes = require("./routes/userRoutes");
const fileroutes = require("./routes/fileRoutes")
// const passport = require('passport')
const app= express();
const PORT = 3091

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/file',fileroutes)
app.use('/api',userroutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

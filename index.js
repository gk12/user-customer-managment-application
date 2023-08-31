require("./db/db")
const express = require("express")
const bodyParser = require("body-parser")
const userroutes = require("./routes/userRoutes");
const fileroutes = require("./routes/fileRoutes")
const app= express();
const PORT = 3091

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/file',fileroutes)
app.use('/api',userroutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

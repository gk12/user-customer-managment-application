require("./db/db")
const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/userRoutes");
const app= express();
const PORT = 3028

app.use(bodyParser.json());

app.use('/api',routes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

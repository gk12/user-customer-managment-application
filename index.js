require("./db/db")
const express = require("express")
const userroutes = require("./routes/userRoutes");
const fileroutes = require("./routes/fileRoutes")
const initalizingPassport = require('./passport/initsession')
const {createUser} = require('./controller/userController')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger')
const app= express();
const PORT = 3093
initalizingPassport(app)
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/file',fileroutes)
app.use('/api',userroutes);

// /**
//  * @swagger
//  * /hello:
//  *   get:
//  *     summary: Returns a hello message
//  *     responses:
//  *       200:
//  *         description: A successful response
//  *         content:
//  *           application/json:
//  *             example: { message: 'Hello, World!' }
//  */
// app.get('/hello', (req, res) => {
//     res.json({ message: 'Hello, World!' });
//   });

// documents generated through the swagger will be get through this api call
// http://localhost:PORT/docs
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

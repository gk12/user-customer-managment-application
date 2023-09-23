require("./db/db")
const express = require("express")
const userroutes = require("./routes/userRoutes");
const fileroutes = require("./routes/fileRoutes")
const initalizingPassport = require('./passport/initsession')
const {createUser} = require('./controller/userController')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const logger = require('./utils/logger');
const app= express();
const PORT = 3094
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
app.use((req,res,next)=>{
   logger.info(`incoming request ${req.method} ${req.url}`)
   next();
})

// app.get('/',(req,res)=>{
//     logger.info('request to the root route')
//     res.send('hello world')
// })



app.listen(PORT,()=>{
    logger.info(`server is running on port ${PORT}`);
})

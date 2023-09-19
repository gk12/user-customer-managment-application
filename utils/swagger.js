// it is used to bulid swagger doc
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
// const log = require('logger')
const path = require('path')
const port = 3093

//swagger options
const options = {
    definition:{
         openapi:"3.0.0",
         info:{
            title:'Rest Api Docs',
            version: '1.0.0',         
        },
        // we get data on this url
        servers:[
            {
                url:`http://localhost:${port}`
            }
        ]
    },
    // path of the file.we can add multiple files.we can add schema also
    // if we write '../routes/*.js' then it will work with all the js files
    apis: [path.resolve(__dirname, '../routes/userRoutes.js')]
}

// i have used jsdoc but we can use Yml also
const swaggerSpec = swaggerJsdoc(options)
module.exports = swaggerSpec
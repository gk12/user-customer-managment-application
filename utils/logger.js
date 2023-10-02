const {createLogger,format,transports} = require('winston')
const path = require('path')

const logger = createLogger({
    level:'info',
    format:format.combine(
        format.colorize(),
        format.timestamp(),
        // these are will be show inside log file/print
        format.printf(({timestamp,level,message})=>{
            return `${timestamp}[${level}]:${message}`;
        })
    ),
    transports:[
        new transports.Console(),
        // created a file app.log where all the details will fill with 
        // different levels according to the logger
        new transports.File({
            filename: path.join(__dirname, 'logs', 'app.log'), 
            // maxsize size of log file will be
            // maxsize: 500
        }),
    ]
})
module.exports = logger
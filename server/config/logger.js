// const { createLogger, transports, format} = require('winston');
// require('winston-mongodb');

// const logger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'info.log',
//             level: 'info',
//             format: format.combine(
//                 format.timestamp({
//                     format: 'YYYY-MM-DD  HH:mm:ss'
//                 }),
//                 format.printf(info=> `${info.timestamp} ${info.level}: ${info.message}`)
//             )    

//             })
//     ],
//     exceptionHandlers: [
//         new transports.File({ filename: 'exceptions.log'})
//     ]
// });


// module.exports = logger;
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, simple } = format;
const path = require('path');
import { utils } from '../utils/utils';

// para usar el logger en toda la app
module.exports = createLogger({
    format: combine(
        simple(),
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        printf( (info: any) => `[${info.timestamp}][${info.level.toUpperCase()}]${info.message}`),
    ),
    // logger de consola o file etc, cada transport gestiona un tipo
    transports: [
        new transports.Console({
            level: 'debug'
        }),
        // escribe info en un fichero de log, para añadir nuevas lineas durante la app, usar logger.info('texto')
        new transports.File({
            maxsize: 5120000, // 5 mg aprox
            maxFiles: 10,
            filename: path.join(__dirname, `../logs/${utils.currentDate()}.log`)
        })
    ]
})
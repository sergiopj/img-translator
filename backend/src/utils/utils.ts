
import { helper } from '../helpers/helper';

const isBase64 = require('is-base64');
const fs = require('fs');

export class utils {

    // obtiene la fecha actual /dd/mm/yy
    static currentDate = (): string => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        const hh = today.getHours();
        const mms = today.getMinutes();
        const ss = today.getSeconds();
        return `${today}-${hh}:${mms}:${ss}`;
    };

    // para saber si un string en base 64 tiene el formato correcto
    static base64StrValidator = (b64str: string): boolean => {
        try {
            return isBase64(b64str, { allowMime: true }) ? true : false;
        } catch (error) {
            console.error('TEST ERROR ', error)
            return false;
        }
    }

    // borrar un fichero de un directorio
    static deleteFile = (filePath: string): void => {
        try {
            fs.unlinkSync(filePath);
            helper.eventLoging(`File removed on path ${filePath}`, 'success');
        } catch (err) {
            helper.eventLoging(`Something wrong happened removing the file on path ${filePath}`, 'error');
        }
    }

    // comprobar si existe un directorio, si no existe se crea
    static checkDir = (path: string): void => {
        if (!fs.existsSync(path)) {
            try {
                fs.mkdirSync(path);
            } catch (error) {
                helper.eventLoging(`Something wrong when try to create dir ${path}`, 'error');
            }
        }
    }
}


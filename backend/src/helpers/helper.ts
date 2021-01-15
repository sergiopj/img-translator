const base64ToImage = require('base64-to-image');
const translate = require('translate-google');
const textract = require('textract');
const path = require("path");
const infoLogger = require("../loggers/info.logger");
const DetectLanguage = require('detectlanguage');
import config from '../config/config';


// models
const Translation = require('../entities/models/translation.model');
const User = require('../entities/models/user.model');

// interfaces
import { Translation, User } from '../entities/interfaces/interfaces';
// utils 
import { utils } from '../utils/utils';


export class helper {

    // recibe una imagen en base 64 y devuelve el texto obtenido de la misma
    static getTextFromBs64Img = async (base64Img: string): Promise<string> => {

        return new Promise(async (resolve, reject) => {
            const imgPath = path.join(__dirname, `../images/`);
            const optionalObj = { 'fileName': 'image', 'type': 'png' };
            try {
                await base64ToImage(base64Img, imgPath, optionalObj);
                textract.fromFileWithPath(`${imgPath}image.png`, (err: Error, text: string) => {
                    if (err) {
                        reject(new Error('Error when extract text from base64image' + err));
                    }
                    utils.deleteFile(`${imgPath}image.png`);
                    // hay que intentar limpiar el texto, que no meta caracteres raros, fallos, etc
                    resolve(text);
                });
            } catch (error) {
                reject(new Error('Error when extract text from base64image' + error));
            }
        });
    }

    static getTranslatedText = (text: string, from: string, to: string): Promise<string> => {

        return new Promise((resolve, reject) => {
            translate(text, { from, to })
                .then((res: any) => {
                    resolve(res);
                })
                .catch((err: Error) => {
                    reject(new Error('Error when translate text from base64image' + err));
                })
        });
    }


    // to add translate info in bd
    static saveTranslateInfo(data: Translation): Promise<Translation> {

        const { translatedText, inputLng, outputLng, translateTextLenght } = data;
        return new Promise((resolve, reject) => {
            const translation: Translation = new Translation({
                translatedText,
                inputLng,
                outputLng,
                translateTextLenght,
                translateAt: utils.currentDate(),
            })
                .save()
                .then((translationInfo: Translation) => {
                    resolve(translationInfo);
                })
                .catch((err: Error) => reject(new Error('Error when save info in bd' + err)));
        })
    }

    // to add translate info in bd
    static saveUserInfo(data: User): Promise<User> {

        const { ip, accessAt, source, browser } = data;

        return new Promise((resolve, reject) => {
            const user: User = new User({
                ip,
                accessAt,
                source,
                browser,
            })
                .save()
                .then((userInfo: User) => {
                    resolve(userInfo);
                })
                .catch((err: Error) => reject(new Error('Error when save info in bd' + err)));
        })
    }

    // recibe un tipo de error y su texto
    static eventLoging(text: string, type: string): void {
        // registrar errores
        infoLogger.info(`[${type.toUpperCase()}] ${text}`);
    }

    // recibe un texto y devuelve el idioma
    static extractLng(text: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const detectlanguage = new DetectLanguage(config.LNG_API_KEY);
            // TODO typear todos los any
            detectlanguage.detect(text).then((result: any) => {
                if (result.length > 0) {
                    resolve(result[0].language);
                } else {
                    reject(new Error('Error when extract language from img'));
                }
            });
        })
    }
}
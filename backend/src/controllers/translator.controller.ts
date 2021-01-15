"use strict";
/* jshint esversion: 6 */
import * as express from 'express';
import { helper } from '../helpers/helper';
// interfaces 
import { Translation } from '../entities/interfaces/interfaces';
// utils
import { utils } from '../utils/utils';
// model
import { User } from '../entities/interfaces/interfaces';

const useragent = require('useragent');
const getIP = require("ipware")().get_ip;
const path = require('path');

async function transtaleText(req: express.Request, res: express.Response) {

    // comprobar si existe el dir src/image si no lo creamos
    await utils.checkDir(path.join(__dirname, '../images'));
    
    const { bs64Img, to } = req.body;


    // verificar si bs64Img tiene el formato correcto
    if (!utils.base64StrValidator(bs64Img)) {
        // guardamos info en su fichero de log
        helper.eventLoging('No se pudo realizar la traducción imagen en base64 no válida', 'error');
        return res.status(500).send({
            ok: false,
            message: `Error el base64 string no es válido`
        });
    }

    try {
        // obtenemos el texto de una imagen
        const imgText: string = await helper.getTextFromBs64Img(bs64Img);
        // obtenemos en que lenguaje esta el texto de la imagen
        const imgLng = await helper.extractLng(imgText);
        // lo traduccimos
        const translatedText: string = await helper.getTranslatedText(imgText, imgLng, to);
        const translation: Translation = {
            translatedText,
            imgText,
            inputLng: imgLng,
            outputLng: to,
            translateTextLenght: translatedText.length,
            imgTextLenght: imgText.length
        };
        // salvamos estadisticas en mongo de la traduccion
        await helper.saveTranslateInfo(translation)
            .then((info: Translation) => {
                // guardamos info en su fichero de log
                helper.eventLoging(`Guardado de estadisticas en la bd de la traduccion ${info._id}`, 'success');
                helper.eventLoging(`Traducción realizada correctamente con id ${info._id}`, 'success');
            })
            .catch(err => {
                helper.eventLoging(`No se pudo guarda las estadísticas de una traduccion`, 'error');
            })

        // salvamos estadisticas de user en la bd
        try {
            const agent = useragent.parse(req.headers['user-agent']);

            const ip = getIP(req);
            const user: User = {
                ip: ip.clientIp,
                accessAt: utils.currentDate(),
                source: agent.source,
                browser: agent.family,
            };

            // se guardan las analiticas
            await helper.saveUserInfo(user)
                .then((info: User) => {
                    // guardamos info en su fichero de log
                    helper.eventLoging(`Se guardan en bd los datos del cliente que accede con id ${info._id}`, 'success');
                })
                .catch(err => {
                    helper.eventLoging(`No se pudo guardar la info de un usuario en la bd`, 'error');
                })


        } catch (error) {
            helper.eventLoging(`No se pudo guardar la info de un usuario en la bd`, 'error');
        }

        res.send(translation);

    } catch (error) {

        // TODO hacer logging del error tb
        helper.eventLoging(`No se pudo realizar la traducción`, 'error');

        return res.status(500).send({
            ok: false,
            message: `Error al realizar la traducción`,
            error
        });
    }
}

module.exports = {
    transtaleText
};

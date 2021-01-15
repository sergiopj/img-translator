// interfaces (front and back used)
export interface Translation {
    _id?: String;
    translatedText: String;
    imgText: String;
    inputLng: String;
    outputLng: String;
    translateTextLenght: Number;
    imgTextLenght: Number;
}

export interface User {
    _id?: String;
    ip: String;
    accessAt: String;
    source: String;   
    browser: String;
}


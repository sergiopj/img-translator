import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// models
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})
export class ImagenTranslatorService {

  constructor(private http: HttpClient,
  ) { }

  getTranslatedText(bs64Img: string): Observable<Translation> {
    const translationUrl = `http://localhost:3000/transtale`;
    return this.http.post<Translation>(translationUrl, {
      bs64Img,
      to: navigator.language || navigator.languages[1] // idioma del navegador
    }).pipe(map(translation => {
      return translation;
    }));
  }

  // TODO guardar texto traducido para usar en las cards asi como el titulo etc  

}

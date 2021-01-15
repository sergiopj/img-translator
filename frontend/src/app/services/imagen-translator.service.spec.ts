import { TestBed } from '@angular/core/testing';

import { ImagenTranslatorService } from './imagen-translator.service';

describe('ImagenTranslatorService', () => {
  let service: ImagenTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

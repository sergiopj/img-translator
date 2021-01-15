import { Component, OnInit, ViewChild } from '@angular/core';
import { ImagenTranslatorService } from '../../services/imagen-translator.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;

  constructor(public imgTrServ: ImagenTranslatorService, public imageCompress: NgxImageCompressService) {
  }

  ngOnInit(): void {
  }

  fileAttr = 'Choose File';


  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
          this.imageCompress.compressFile(imgBase64Path, 50, 50).then(
            (compressb64: string) => {
              this.imgTrServ.getTranslatedText(compressb64)
                .subscribe(info => {
                  console.log(info);
                }, error => {
                  console.log(error);
                });
            }
          );
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}

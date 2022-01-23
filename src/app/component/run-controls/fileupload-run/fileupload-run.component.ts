import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from "../../../service/app.service";

@Component({
  selector: 'app-fileupload-run',
  templateUrl: './fileupload-run.component.html',
  styleUrls: ['./fileupload-run.component.scss']
})
export class FileuploadRunComponent implements OnInit {

  @Input() index;

  constructor(
    private snackBar: MatSnackBar,
    public appService: AppService) { }

  ngOnInit() {
    // this.appService.isFileUploadRunning = true;
  }

  onSelect(event) {
    this.appService.fileArray.push(...event.addedFiles);
    this.appService.fileArray.forEach(element => {
      this.readFile(element).then(fileContents => {
        element.content = fileContents;
        element.tenantID = localStorage.getItem('formTenantId');
      });
    });
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

  onFilesRejected(files: File[]) {
    this.snackBar.open('Your file is too big, must be 5 Megabytes or less.', "Error:", 
        {duration: 5000})
  }

  onRemove(idx) {
    this.appService.fileArray.splice(idx, 1);
  }

}

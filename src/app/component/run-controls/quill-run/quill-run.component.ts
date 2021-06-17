import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

@Component({
  selector: 'app-quill-run',
  templateUrl: './quill-run.component.html',
  styleUrls: ['./quill-run.component.scss']
})
export class QuillRunComponent {

  @Input() index;
  
  content;
  quillConfig = {
    toolbar: false,
    theme: 'bubble'
  };

  constructor(public appService: AppService) { }

}

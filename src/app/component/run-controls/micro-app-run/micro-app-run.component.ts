import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-micro-app-run',
  templateUrl: './micro-app-run.component.html',
  styleUrls: ['./micro-app-run.component.scss']
})
export class MicroAppRunComponent implements OnInit {

  @Input() index;

  link;
  isLoaded = false;

  constructor(
    private sanitizer: DomSanitizer,
    public appService: AppService) { }

  ngOnInit(): void {
    this.isLoaded = true;
    
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.appService.detailArray[this.index]["link"]);
  
  }

}

import { Component, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

@Component({
  selector: 'app-label-run',
  templateUrl: './label-run.component.html',
  styleUrls: ['./label-run.component.scss']
})
export class LabelRunComponent {

  @Input() index;

  constructor(public appService: AppService) { }

}

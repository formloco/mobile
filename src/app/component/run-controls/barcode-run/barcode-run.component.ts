import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

@Component({
  selector: 'app-barcode-run',
  templateUrl: './barcode-run.component.html',
  styleUrls: ['./barcode-run.component.scss']
})
export class BarcodeRunComponent implements OnInit {

  @Input() index;

  value;

  constructor(public appService: AppService) { }

  ngOnInit(): void {}

}

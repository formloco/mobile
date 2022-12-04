import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})

export class DashboardFilterComponent implements OnInit {

  @Input() filters;
  @Output() filterUpdate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  updateFilters(key, value) {
    this.filters[key] = value
    this.filterUpdate.emit(this.filters)
  }
}

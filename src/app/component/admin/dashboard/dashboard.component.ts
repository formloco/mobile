import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { AuthState } from '../../../state/auth/auth.state'
import { SetSelectedForm } from '../../../state/auth/auth-state.actions'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @Select(AuthState.forms) forms$: Observable<any[]>

  public charts: any[] = []
  options: any

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.select(AuthState.forms).subscribe((forms: any) => {
      forms.forEach(element => {
        this.charts.push(element.name+' Inspections by Division')
        this.charts.push(element.name+' Inspections by Supervisor')
        this.charts.push(element.name+' Discrepancies')
      })
      console.log(this.charts)
    })
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  exportData() {

  }

}
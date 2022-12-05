import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  // Output,
  // EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { AuthState } from '../../../state/auth/auth.state';
import { SetSelectedForm } from '../../../state/auth/auth-state.actions';
import { NotificationState } from 'src/app/state/notification/notification.state';
import { ApiService } from "../../../service/api.service"

import { SetNotification } from 'src/app/state/notification/notification-state.actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // @Select(AuthState.forms) forms$: Observable<any[]>
  @Select(NotificationState.notificationAllOpen)
  notificationOpen$: Observable<string>;
  @Select(NotificationState.notificationAllSigned)
  notificationSigned$: Observable<string>;
  @Select(AuthState.supervisors)
  supervisors$: Observable<string>;
  // @Output() filterUpdate = new EventEmitter()

  public charts: any[] = [];
  options: any;
  openForms: any[] = [];
  signedForms: any[] = [];
  supervisors: any[] = [];
  filters = {
    form: 'all',
    month: 'all',
    year: 'all',
    supervisor: 'all',
  };
  getAllOpen;
  getAllSigned;

  // updateFilters(key, value) {
  //   this.filterUpdate.emit(this.filters[key] = value)
  // }

  constructor(private store: Store,
    private apiService: ApiService) {}

  ngOnInit(): void {
    this.store.select(AuthState.supervisors).subscribe((supers: any) => {
      if (supers) {
        supers.forEach((person: any) => {
          this.supervisors.push(person);
        });
      }
    });

    this.getAllOpen = () =>
      this.store
        .select(NotificationState.notificationAllOpen)
        .subscribe((forms: any) => {
          if (forms) {
            forms.forEach((form: any) => {
              this.openForms.push(form);
            });
          }
        });
    this.getAllOpen();
    this.getAllSigned = () =>
      this.store
        .select(NotificationState.notificationAllSigned)
        .subscribe((forms: any) => {
          if (forms) {
            forms.forEach((form: any) => {
              this.signedForms.push(form);
            });
          }
        });
    this.getAllSigned();

    // this.store.select(AuthState.forms).subscribe((forms: any) => {
    //   forms.forEach(element => {
    //     this.charts.push(element.name+' Inspections by Division')
    //     this.charts.push(element.name+' Inspections by Supervisor')
    //     this.charts.push(element.name+' Discrepancies')
    //   })
    //   console.log(this.charts)
    // })
    // const xAxisData = [];
    // const data1 = [];
    // const data2 = [];

    // for (let i = 0; i < 100; i++) {
    //   xAxisData.push('category' + i);
    //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    //   data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    // }

    // this.options = {
    //   legend: {
    //     data: ['bar', 'bar2'],
    //     align: 'left',
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: xAxisData,
    //     silent: false,
    //     splitLine: {
    //       show: false,
    //     },
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: 'bar',
    //       type: 'bar',
    //       data: data1,
    //       animationDelay: (idx) => idx * 10,
    //     },
    //     {
    //       name: 'bar2',
    //       type: 'bar',
    //       data: data2,
    //       animationDelay: (idx) => idx * 10 + 100,
    //     },
    //   ],
    //   animationEasing: 'elasticOut',
    //   animationDelayUpdate: (idx) => idx * 5,
    // };
  }

  exportData() {}
    // corrective_action: false;
  // data_id: null;
  // date: '2022-12-03T15:00:41.000Z';
  // date_signed: null;
  // description: 'Worksite Safety Inspection, Dec 3, 3:0PM';
  // email_from: 'brock@formloco.com';
  // email_from_id: 352;
  // email_signed: null;
  // email_to: 'alvin.tol@hotmail.com';
  // email_to_id: 2;
  // form_id: 'f17f0bf7-bacd-4bee-97d8-e4e35a44b1f1';
  // form_name: 'Worksite Safety Inspection';
  // id: 406;
  // pdf: 'worksite-safety-inspection479';
  // read: true;
  // signed: null;
  // signed_name: null;
  
    getSupervisor(email) {
      const index = this.supervisors.findIndex(
        (target: any) =>
          target.email === email
      );
      return this.supervisors[index].name;
    }
  
  getUpdatedFilter($event) {
    const { form, month, year, supervisor } = this.filters;
    this.filters = $event;
    this.openForms = [];
    this.signedForms = [];
    
    if (
      form !== 'all' ||
      month !== 'all' ||
      year !== 'all' ||
      supervisor !== 'all'
    ) {
      this.store
        .select(NotificationState.notificationAllOpen)
        .subscribe((forms: any) => {
          if (forms) {
            forms.forEach((form: any) => {
              if (
                (form.form_name === this.filters.form || this.filters.form === 'all') &&
                (form.date.includes(`-${this.filters.month}-`) || this.filters.month === 'all')&&
                (form.date.includes(`${this.filters.year}-`)|| this.filters.year === 'all') &&
                (form.email_to === this.filters.supervisor || this.filters.supervisor === 'all')
                ) {
                  this.openForms.push(form);
                }
              });
          }
        });
      this.store
        .select(NotificationState.notificationAllSigned)
        .subscribe((forms: any) => {
          if (forms) {
            forms.forEach((form: any) => {
              if (
                (form.form_name === this.filters.form || this.filters.form === 'all') &&
                (form.date.includes(`-${this.filters.month}-`) || this.filters.month === 'all') &&
                (form.date.includes(`${this.filters.year}-`)|| this.filters.year === 'all') &&
                (form.email_to === this.filters.supervisor || this.filters.supervisor === 'all')
                  )
                {
                this.signedForms.push(form);
              }
            });
          }
        });
    } else {
      this.getAllOpen();
      this.getAllSigned();
    }
  }

  getDate(date) {
    return date.split('').slice(0, 10).join('');
  }

  getPdf(form) {
    console.log('get pdf', form)
    // this.store.dispatch(new SetNotification(form));
    // const notification = this.store.selectSnapshot(NotificationState.notification)
    // console.log({notification})
    this.apiService.getPDF(form.pdf)
  }

  openForm(notification, idx) {
    // this.store.dispatch(new SetComments([]));
    // this.store.dispatch(new SetCorrectiveActions([]));
    // this.store.dispatch(new SetNotification(notification));
    // this.store.dispatch(new SetNotificationIdx(idx));
    // const page = this.store.selectSnapshot(AuthState.page);
    // const childPage = this.store.selectSnapshot(AuthState.childPage);
    // this.apiService
    //   .getFormData(notification.form_id, notification.data_id)
    //   .subscribe((data: any) => {
    //     const selectedForm: any = this.store.selectSnapshot(
    //       AuthState.selectedForm
    //     );
    //     this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(false));
    //     this.store.dispatch(new SetSelectedForm(selectedForm));
    //     this.store.dispatch(new SetFormData(data));
    //     this.store.dispatch(new SetCorrectiveActions(data.correctiveAction));
    //     this.store.dispatch(new SetChildPage('notification'));
    //     this.store.dispatch(new SetPage('form'));
    //   });
  }


}

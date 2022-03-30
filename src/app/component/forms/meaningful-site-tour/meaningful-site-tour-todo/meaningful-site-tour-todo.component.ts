import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meaningful-site-tour-todo',
  templateUrl: './meaningful-site-tour-todo.component.html',
  styleUrls: ['./meaningful-site-tour-todo.component.scss']
})
export class MeaningfulSiteTourTodoComponent {

  @Input() todoForm

  constructor() { }

  ngOnInit(): void {
  }

}

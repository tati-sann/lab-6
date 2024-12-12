import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import moment from 'moment/moment';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
      MatCardModule,
      MatChipsModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() id: string = ''
  @Input() title: string = ''
  @Input() type: string = ''
  @Input() priority: string = ''
  @Input() assignee: string = ''
  @Input() creator: string = ''
  @Input() createdAt: string = ''
  @Input() updatedAt: string = ''

  url = "";
  ngOnInit() {
    this.url = `/form/${this.id}`;
  }
}

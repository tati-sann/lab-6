import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatListItem } from '@angular/material/list';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import moment from 'moment';
import {MatChip, MatChipSet} from '@angular/material/chips';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    MatListItem,
    MatMiniFabButton,
    MatIconModule,
    MatIconButton,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() id: string  = ""
  @Input() title: string = ''
  @Input() type: string = ''
  @Input() priority: string = ''
  @Input() updatedAt: Date = new Date()
  @Output() addToBoard = new EventEmitter<void>();

  updateDate = "";
  url = "";
  ngOnInit() {
    this.updateDate = moment(this.updatedAt).format("DD.MM.YYYY HH:mm");
    this.url = `/form/${this.id}`;
  }

  onClick(): void {
    this.addToBoard.emit();
  }
}

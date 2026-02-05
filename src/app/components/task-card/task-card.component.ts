import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiTask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: false,
})
export class TaskCardComponent {
  @Input() task!: ApiTask;
  @Output() delete = new EventEmitter<ApiTask>();

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.task);
  }
}

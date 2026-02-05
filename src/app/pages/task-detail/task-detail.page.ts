import { Component, OnInit } from '@angular/core';
import { ApiTask } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: false,
  
})
export class TaskDetailPage implements OnInit {
  task!: ApiTask;

  constructor(
    private tasksService: TasksService
  ) {}

  ngOnInit() {
  const state = history.state;

  if (state && state.task) {
    this.task = state.task;
  }
}

  async toggleCompleted() {
    if (this.task) {
      this.task.completed = !this.task.completed;
      await this.tasksService.updateTask(this.task);
    }
  }
}

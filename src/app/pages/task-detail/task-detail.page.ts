// task-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    const taskData = history.state.task as ApiTask;
    if (taskData) {
      this.task = taskData;
    } else {
      console.warn('No se pasaron datos de la tarea');
    }
  }

  async toggleCompleted() {
    if (this.task) {
      this.task.completed = !this.task.completed;
      await this.tasksService.updateTask(this.task);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UseTasksHook } from 'src/app/hooks/use-tasks.hooks';
import { Router } from '@angular/router';
import { ApiTask } from 'src/app/models/task.model';

type FilterType = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  standalone: false,

})
export class TasksListPage implements OnInit {
  constructor(public tasksHook: UseTasksHook,private router: Router) {}

  async ngOnInit() {
    await this.tasksHook.loadTasks();
  }

  async ionViewWillEnter() {
    await this.tasksHook.loadTasks();
  }

  goToDetail(task: ApiTask) {
  this.router.navigate(['/task/detail'], { state: { task } });
}
}

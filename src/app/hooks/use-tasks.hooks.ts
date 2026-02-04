import { Injectable } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask } from '../models/task.model';

export type FilterType = 'all' | 'pending' | 'completed';

@Injectable({ providedIn: 'root' })
export class UseTasksHook {
  tasks: ApiTask[] = [];
  loading = false;

  selectedFilter: FilterType = 'all';
  offlineMode = false;

  constructor(private tasksService: TasksService) {}

  private isCompleted(task: ApiTask): boolean {
    return (task as any).completed === true;
  }

  async loadTasks(event?: any) {
    try {
      this.loading = true;

      if (this.offlineMode) {
        const cached = await this.tasksService.getCachedTasks();
        this.tasks = cached ?? [];
        console.log('Modo offline — tareas cargadas desde caché:', this.tasks);
      } else {
        this.tasks = await this.tasksService.getTasks();
        console.log('Tareas cargadas desde API:', this.tasks);
      }
    } catch (error) {
      console.error('Error cargando tareas:', error);
    } finally {
      this.loading = false;
      if (event) event.target.complete();
    }
  }

  setFilter(filter: FilterType) {
    this.selectedFilter = filter;
  }

  toggleOfflineMode(value: boolean) {
    this.offlineMode = value;
    this.loadTasks();
  }

  get filteredTasks(): ApiTask[] {
    if (this.selectedFilter === 'pending') {
      return this.tasks.filter(t => !this.isCompleted(t));
    }

    if (this.selectedFilter === 'completed') {
      return this.tasks.filter(t => this.isCompleted(t));
    }

    return this.tasks;
  }

  get pendingCount(): number {
    return this.tasks.filter(t => !this.isCompleted(t)).length;
  }
}

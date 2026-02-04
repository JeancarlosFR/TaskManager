import { Injectable } from '@angular/core';
import axios from 'axios';
import { StorageService } from './storage.service';
import { ApiTask } from '../models/task.model';



@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private readonly LOCAL_CHANGES_KEY = 'task_local_changes';

  constructor(private storageService: StorageService) {}

  private assignDateToTask(task: any): ApiTask {
    if (!task.date) {
      task.date = new Date().toISOString();
    }
    return task as ApiTask;
  }

  async getTasks(): Promise<ApiTask[]> {
    try {
      const res = await axios.get<ApiTask[]>(`${this.baseUrl}/todos`);
      const apiTasks = res.data;
      
      // Obtener cambios locales
      const localChanges = await this.storageService.get<Record<number, ApiTask>>(this.LOCAL_CHANGES_KEY) || {};
      
      // Fusionar cambios locales con datos de la API y asignar fechas
      const mergedTasks = apiTasks.map(task => {
        const taskWithChanges = localChanges[task.id] || task;
        return this.assignDateToTask(taskWithChanges);
      });
      
      // Guardar cambios locales actualizados con fechas
      for (const task of mergedTasks) {
        if (!localChanges[task.id] || !localChanges[task.id].date) {
          localChanges[task.id] = task;
        }
      }
      await this.storageService.set(this.LOCAL_CHANGES_KEY, localChanges);
      
      // Guardar en Storage local
      await this.storageService.set('tasks', mergedTasks);
      return mergedTasks;
    } catch (err) {
      const cached = await this.storageService.get<ApiTask[]>('tasks');
      if (cached && cached.length) return cached;
      throw err;
    }
  }

  async getTaskById(id: number): Promise<ApiTask> {
    const res = await axios.get<ApiTask>(`${this.baseUrl}/todos/${id}`);
    return res.data;
  }

  async getCachedTasks(): Promise<ApiTask[] | null> {
    const cached = await this.storageService.get<ApiTask[]>('tasks');
    if (cached) {
      return cached.map(task => this.assignDateToTask(task));
    }
    return cached;
  }

  async updateTask(updatedTask: ApiTask): Promise<void> {
    // Actualizar en el storage de tareas
    const tasks = await this.storageService.get<ApiTask[]>('tasks') || [];
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      await this.storageService.set('tasks', tasks);
    }
    
    // Guardar en cambios locales para persistir entre recargas de API
    const localChanges = await this.storageService.get<Record<number, ApiTask>>(this.LOCAL_CHANGES_KEY) || {};
    localChanges[updatedTask.id] = updatedTask;
    await this.storageService.set(this.LOCAL_CHANGES_KEY, localChanges);
  }
}

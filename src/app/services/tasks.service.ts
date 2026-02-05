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

    const localChanges =
      (await this.storageService.get<Record<number, ApiTask>>(this.LOCAL_CHANGES_KEY)) || {};

    const mergedTasks = apiTasks.map(task =>
      this.assignDateToTask(localChanges[task.id] || task)
    );

    const localOnlyTasks = Object.values(localChanges).filter(
      localTask => !apiTasks.some(apiTask => apiTask.id === localTask.id)
    );

    const finalTasks = [...localOnlyTasks, ...mergedTasks];

    await this.storageService.set('tasks', finalTasks);
    return finalTasks;

  } catch (err) {
    const cached = await this.storageService.get<ApiTask[]>('tasks');
    if (cached && cached.length) return cached;
    throw err;
  }
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

  async createTask(taskData: { title: string; descripcion?: string; date?: string }): Promise<ApiTask> {
    const tasks = await this.storageService.get<ApiTask[]>('tasks') || [];
    
    const newTask: ApiTask = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: taskData.title,
      descripcion: taskData.descripcion || '',
      date: taskData.date || new Date().toISOString(),
      completed: false,
      userId: 1
    };


    // Agregar al inicio de la lista
    tasks.unshift(newTask);
    await this.storageService.set('tasks', tasks);
    console.log('Tareas:', tasks);
    
    // Guardar en cambios locales
    const localChanges = await this.storageService.get<Record<number, ApiTask>>(this.LOCAL_CHANGES_KEY) || {};
    localChanges[newTask.id] = newTask;
    await this.storageService.set(this.LOCAL_CHANGES_KEY, localChanges);
    console.log('Cambios locales:', localChanges);
    
    return newTask;
  }

  async deleteTask(taskId: number): Promise<void> {
    // Eliminar de la lista de tareas
    const tasks = await this.storageService.get<ApiTask[]>('tasks') || [];
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    await this.storageService.set('tasks', filteredTasks);
    
    // Eliminar de cambios locales
    const localChanges = await this.storageService.get<Record<number, ApiTask>>(this.LOCAL_CHANGES_KEY) || {};
    delete localChanges[taskId];
    await this.storageService.set(this.LOCAL_CHANGES_KEY, localChanges);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TasksService } from '../../services/tasks.service';
import { UseTasksHook } from '../../hooks/use-tasks.hooks';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
  standalone: false,

})
export class TaskCreatePage implements OnInit {
  title: string = '';
  descripcion: string = '';
  date: string | null = null;
  
  titleTouched: boolean = false;
  titleMinLength: number = 3;
  titleMaxLength: number = 100;
  descripcionMaxLength: number = 500;

  constructor(
    private tasksService: TasksService,
    private tasksHook: UseTasksHook,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  get isTitleValid(): boolean {
    const trimmed = this.title.trim();
    return trimmed.length >= this.titleMinLength && trimmed.length <= this.titleMaxLength;
  }

  get isDescripcionValid(): boolean {
    return this.descripcion.trim().length <= this.descripcionMaxLength;
  }

  get canSubmit(): boolean {
    return this.isTitleValid && this.isDescripcionValid;
  }

  onTitleBlur() {
    this.titleTouched = true;
  }

  async createTask() {
    this.titleTouched = true;

    if (!this.title.trim()) {
      await this.showToast('El título es obligatorio', 'warning');
      return;
    }

    if (this.title.trim().length < this.titleMinLength) {
      await this.showToast(`El título debe tener al menos ${this.titleMinLength} caracteres`, 'warning');
      return;
    }

    if (this.title.trim().length > this.titleMaxLength) {
      await this.showToast(`El título no puede exceder ${this.titleMaxLength} caracteres`, 'warning');
      return;
    }

    if (this.descripcion.trim().length > this.descripcionMaxLength) {
      await this.showToast(`La descripción no puede exceder ${this.descripcionMaxLength} caracteres`, 'warning');
      return;
    }

    try {
      await this.tasksService.createTask({
        title: this.title.trim(),
        descripcion: this.descripcion.trim(),
        date: this.date ?? undefined
      });
      
      // Recargar las tareas en el hook
      await this.tasksHook.loadTasks();
      
      await this.showToast('Tarea creada exitosamente', 'success');
      this.navCtrl.back();
    } catch (error) {
      console.error('Error al crear tarea:', error);
      await this.showToast('Error al crear la tarea', 'danger');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

}

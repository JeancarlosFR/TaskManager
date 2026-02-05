import { Component, OnInit } from '@angular/core';
import { UseTasksHook } from 'src/app/hooks/use-tasks.hooks';
import { Router } from '@angular/router';
import { ApiTask } from 'src/app/models/task.model';
import { ThemeService } from 'src/app/services/theme.service';
import { TasksService } from 'src/app/services/tasks.service';
import { AlertController } from '@ionic/angular';

type FilterType = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  standalone: false,
})
export class TasksListPage implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    public tasksHook: UseTasksHook,
    public themeService: ThemeService,
    private tasksService: TasksService,
    private alertController: AlertController,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.tasksHook.loadTasks();
  }

  async ionViewWillEnter() {
    await this.tasksHook.loadTasks();
  }

  goToDetail(task: ApiTask) {
    this.router.navigate(['/task/detail'], { state: { task } });
  }

  goToCreate() {
    this.router.navigate(['/task/create']);
  }

  get paginatedTasks(): ApiTask[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tasksHook.filteredTasks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.tasksHook.filteredTasks.length / this.itemsPerPage);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.hasPreviousPage) {
      this.currentPage--;
    }
  }

  async deleteTask(task: ApiTask) {
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: `¿Estás seguro de que deseas eliminar "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.tasksService.deleteTask(task.id);
            await this.tasksHook.loadTasks();
          }
        }
      ]
    });

    await alert.present();
  }

  
}

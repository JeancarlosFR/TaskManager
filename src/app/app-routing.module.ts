import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks-list/tasks-list.module').then(m => m.TasksListPageModule),
  },
  {
    path: 'task/create',
    loadChildren: () =>
      import('./pages/task-create/task-create.module').then(m => m.TaskCreatePageModule),
  },
  {
    path: 'task/detail',
    loadChildren: () =>
      import('./pages/task-detail/task-detail.module').then(m => m.TaskDetailPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

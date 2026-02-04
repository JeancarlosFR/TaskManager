import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';

import { TaskCardModule } from 'src/app/components/task-card/task-card.module';
import { CardSkeletonModule } from "src/app/components/card-skeleton/card-skeleton.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksListPageRoutingModule,
    TaskCardModule,
    CardSkeletonModule
],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}

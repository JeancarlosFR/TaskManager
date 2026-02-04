import { CardSkeletonComponent } from './card-skeleton.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CardSkeletonComponent],
  imports: [CommonModule, IonicModule],
  exports: [CardSkeletonComponent],
})
export class CardSkeletonModule {}

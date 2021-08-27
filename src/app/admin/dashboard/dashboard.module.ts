import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

const dashBoardRoutes: Routes = [
  { path: '', component: DashboardComponent }
]


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule.forChild(dashBoardRoutes)
  ],
  providers: [ThemeService]
})
export class DashboardModule { }

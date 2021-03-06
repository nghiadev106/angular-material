import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminRoutingModule } from './admin-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NavService } from '../core/services/nav.service';
import { DataService } from '../core/services/data.service';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { UtilityService } from '../core/services/utility.service';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    AdminComponent, HeaderComponent, FooterComponent, SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatBadgeModule,
    AdminRoutingModule
  ], providers: [
    NavService,
    DataService,
    AuthenService,
    NotificationService,
    UtilityService
  ]
})
export class AdminModule { }

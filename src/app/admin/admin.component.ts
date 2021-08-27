import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { NavService } from '../core/services/nav.service';
import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('appDrawer')
  appDrawer!: ElementRef;
  version = VERSION;
  sideBarOpen = true;
  navItems!: NavItem[];
  res!: any[];

  constructor(private navService: NavService, private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.get("/api/function/getlisthierarchy").subscribe(
      (response: any) => {
        this.res = response;
        this.navItems = response.sort((n1: { DisplayOrder: number; }, n2: { DisplayOrder: number; }) => {
          if (n1.DisplayOrder > n2.DisplayOrder) {
            return 1;
          } else if (n1.DisplayOrder < n2.DisplayOrder) {
            return -1;
          }
          return 0;
        });
        console.log(this.navItems);
      },
      (error) => this.dataService.handleError(error)
    );
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/core/services/nav.service';
import { NavItem } from 'src/app/models/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {

  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input()
  item!: NavItem;
  @Input() depth!: number;

  constructor(public navService: NavService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.URL && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.URL}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.ChildFunctions || !item.ChildFunctions.length) {
      this.router.navigate([item.URL]);
      this.navService.closeNav();
    }
    if (item.ChildFunctions && item.ChildFunctions.length) {
      this.expanded = !this.expanded;
    }
  }

}

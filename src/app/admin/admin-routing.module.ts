import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';


const adminRoutes: Routes = [
  {
    //localhost:4200/admin
    path: "",
    component: AdminComponent,
    children: [
      //localhost:4200/admin
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      //localhost:4200/admin/home
      {
        path: "dashboard",
        loadChildren: () =>
          import("src/app/admin/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      //localhost:4200/admin/user
      {
        path: "user",
        loadChildren: () =>
          import("src/app/admin/user/user.module").then((m) => m.UserModule),
      },

      {
        path: "role",
        loadChildren: () =>
          import("src/app/admin/role/role.module").then((m) => m.RoleModule),
      },

      // {
      //   path: "function",
      //   loadChildren: () =>
      //     import("src/app/admin/function/function.module").then(
      //       (m) => m.FunctionModule
      //     ),
      // },

      // {
      //   path: "product-category",
      //   loadChildren: () =>
      //     import("src/app/admin/product-category/product-category.module").then(
      //       (m) => m.ProductCategoryModule
      //     ),
      // },

      // {
      //   path: "product",
      //   loadChildren: () =>
      //     import("src/app/admin/product/product.module").then(
      //       (m) => m.ProductModule
      //     ),
      // },

      // {
      //   path: "order",
      //   loadChildren: () =>
      //     import("src/app/admin/order/order.module").then((m) => m.OrderModule),
      // },
      // {
      //   path: "announcement",
      //   loadChildren: () =>
      //     import("src/app/admin/announcement/announcement.module").then(
      //       (m) => m.AnnouncementModule
      //     ),
      // },
      // {
      //   path: "report",
      //   loadChildren: () =>
      //     import("src/app/admin/report/report.module").then(
      //       (m) => m.ReportModule
      //     ),
      // },
      // // { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' },

      // { path: 'report', loadChildren: './report/report.module#ReportModule' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

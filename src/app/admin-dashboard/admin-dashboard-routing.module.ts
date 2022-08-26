import { RegistrationUserComponent } from './analytiCharts/registration-user/registration-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../service/guards/admin.guard';
import { CanDeactivateGuard } from '../service/guards/can-deactivate.guard';
import { AdminDash } from './admin-dash.component';
import { BarChartComponent } from './analytiCharts/bar-chart/bar-chart.component';
import { ChartTeacherComponent } from './analytiCharts/chart-teacher/chart-teacher.component';
import { CategorieManageComponent } from './categorie-manage/categorie-manage.component';
import { EditCategorieComponent } from './categorie-manage/edit-categorie/edit-categorie.component';
import { ListCategorieComponent } from './categorie-manage/list-categorie/list-categorie.component';
import { CourseAddComponent } from './course-manage/course-add/course-add.component';
import { CourseEditComponent } from './course-manage/course-edit/course-edit.component';
import { CourseListeComponent } from './course-manage/course-liste/course-liste.component';

import { CategorieEditResolverService } from './service/resolver/categorie-edit-resolver.service';
import { CoursEditResolverService } from './service/resolver/cours-edit-resolver.service';
import { SondageComponent } from './sondage/sondage.component';
import { TeacherAddComponent } from './teacher-manage/teacher-add/teacher-add.component';
import { TeacherListComponent } from './teacher-manage/teacher-list/teacher-list.component';
import { ChartComponent } from './analytiCharts/chart/chart.component';
import { ListComponent } from './sondage/list/list.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  {path:'',  
   component:AdminDash, 
   canActivate: [AdminGuard],
   canActivateChild:[AdminGuard],
  children:[
    {
      path:'analytic',
      children:[
        {path:'',component:ChartComponent},

      ]
    },
    {path:'categorie',
     children:[
      {path:'add',component: CategorieManageComponent,canDeactivate: [CanDeactivateGuard]},
      {path:'edit/:id', component:EditCategorieComponent, resolve:{categorie: CategorieEditResolverService},canDeactivate: [CanDeactivateGuard]},
      {path:'',component:ListCategorieComponent}
    ]
  },
  {path:'cours',
  children:[
    {path:'add',component: CourseAddComponent, canDeactivate: [CanDeactivateGuard]},
    {path:'edit/:id',component:CourseEditComponent,canDeactivate: [CanDeactivateGuard],resolve:{cours: CoursEditResolverService}},
    {path:'',component: CourseListeComponent},
  ]},
  {
    path:'teacher',
    children:[
      {path:'add',component:TeacherAddComponent , canDeactivate: [CanDeactivateGuard]},
      {path:'',component:TeacherListComponent}
    ]
  },
  {
    path:'sondage',
    children:[
      {path:'add', component:SondageComponent},
      {path:'', component:ListComponent}
    ]
  },
  {
    path:'profile', children:[
    {path:'edit', component:EditProfileComponent},
    {path:'', component:ProfileComponent}
  ]
  },
  {path:'', redirectTo:'analytic', pathMatch: 'full'  }
  

    
  
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }

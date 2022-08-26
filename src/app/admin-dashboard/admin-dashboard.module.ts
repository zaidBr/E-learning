import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDash } from './admin-dash.component';
import { CategorieManageComponent } from './categorie-manage/categorie-manage.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCategorieComponent } from './categorie-manage/edit-categorie/edit-categorie.component';
import { ListCategorieComponent } from './categorie-manage/list-categorie/list-categorie.component';
import { CategorieComponent } from './categorie-manage/list-categorie/categorie/categorie.component';
import { CourseListeComponent } from './course-manage/course-liste/course-liste.component';
import { CourseAddComponent } from './course-manage/course-add/course-add.component';
import { CourseEditComponent } from './course-manage/course-edit/course-edit.component';
import { CourseDetailComponent } from './course-manage/course-detail/course-detail.component';
import { CourseComponent } from './course-manage/course-liste/course/course.component';
import { TeacherAddComponent } from './teacher-manage/teacher-add/teacher-add.component';
import { TeacherListComponent } from './teacher-manage/teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher-manage/teacher-list/teacher/teacher.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SondageComponent } from './sondage/sondage.component';
import { BarChartComponent } from './analytiCharts/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ChartTeacherComponent } from './analytiCharts/chart-teacher/chart-teacher.component';
import { ChartComponent } from './analytiCharts/chart/chart.component';
import { RegistrationUserComponent } from './analytiCharts/registration-user/registration-user.component';
import { ListComponent } from './sondage/list/list.component';
import { OneSondageComponent } from './sondage/one-sondage/one-sondage.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { GroupeComponent } from './groupe/groupe.component';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [
    AdminDash,
    DashboardComponent,
    CategorieManageComponent,
    EditCategorieComponent,
    CategorieComponent,
    ListCategorieComponent,
    CourseListeComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDetailComponent,
    CourseComponent,
    TeacherAddComponent,
    TeacherListComponent,
    TeacherComponent,
    SondageComponent,
    BarChartComponent,
    ChartTeacherComponent,
    ChartComponent,
    RegistrationUserComponent,
    ListComponent,
    OneSondageComponent,
    EditProfileComponent,
    HeaderNavComponent,
    ProfileComponent,
    GroupeComponent
    
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    AdminDashboardRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    ChartsModule,
    DialogModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AdminDashboardModule { }

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherDashboardRoutingModule } from './teacher-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursDetailsComponent } from './cours-details/cours-details.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RadialChartComponent } from './dashboard/radial-chart/radial-chart.component';
import { CarouselComponent } from './dashboard/carousel/carousel.component';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
import { CoursManageComponent } from './cours-manage/cours-manage.component';
import { AddChapterComponent } from './cours-manage/add-chapter/add-chapter.component';
import { EditChapterComponent } from './cours-manage/edit-chapter/edit-chapter.component';
import { DisplayContentComponent } from './cours-manage/display-content/display-content.component';
import { AddVideoComponent } from './cours-manage/add-video/add-video.component';
import { AddDocumentComponent } from './cours-manage/add-document/add-document.component';
import { AddFileComponent } from './cours-manage/add-file/add-file.component';
import { ChapterContentComponent } from './cours-manage/display-content/chapter-content/chapter-content.component';
import { AllContentComponent } from './cours-manage/all-content/all-content.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {ProgressBarModule} from 'primeng/progressbar';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    DashboardComponent,
    CoursDetailsComponent,
    AnalyticComponent,
    ProfileComponent,
    NavBarComponent,
    WelcomeComponent,
    RadialChartComponent,
    CarouselComponent,
    CoursManageComponent,
    AddChapterComponent,
    EditChapterComponent,
    DisplayContentComponent,
    AddVideoComponent,
    AddDocumentComponent,
    AddFileComponent,
    ChapterContentComponent,
    AllContentComponent,
  ],
  imports: [
    CommonModule,
    TeacherDashboardRoutingModule,
    NgApexchartsModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    FullCalendarModule,
    FullCalendarModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule,
    ReactiveFormsModule,
    AngularEditorModule,
    ProgressBarModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TeacherDashboardModule { }

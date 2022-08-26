import { CarouselComponent } from './dashboard/carousel/carousel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../service/guards/admin.guard';
import { CoursDetailResolverService } from '../service/resolver/cours-detail-resolver.service';
import { CoursDetailsComponent } from './cours-details/cours-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursManageComponent } from './cours-manage/cours-manage.component';
import { DisplayContentComponent } from './cours-manage/display-content/display-content.component';
import { ChapterContentComponent } from './cours-manage/display-content/chapter-content/chapter-content.component';
import { AddVideoComponent } from './cours-manage/add-video/add-video.component';
import { AddFileComponent } from './cours-manage/add-file/add-file.component';
import { AddDocumentComponent } from './cours-manage/add-document/add-document.component';
import { AllContentComponent } from './cours-manage/all-content/all-content.component';
import { TeacherGuard } from '../service/teacher.guard';

const routes: Routes = [
  {path:'', component:DashboardComponent,canActivate:[TeacherGuard],canActivateChild:[TeacherGuard],
  children:[
    {path:'', component:CarouselComponent, children:[
      {path:'cours/:id',component:CoursDetailsComponent,resolve:{cours:CoursDetailResolverService}}
    ]},  
  ]
},
{path:'cours-manage',component:CoursManageComponent,children:[
  {path:':id',component:DisplayContentComponent,children:[
    {path:'content/:chapter',component:ChapterContentComponent,children:[
      {path:'',component:AllContentComponent},
      {path:'add-video',component:AddVideoComponent},
      {path:'add-file',component:AddFileComponent},
      {path:'add-document',component:AddDocumentComponent}
    ]}
  ]}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherDashboardRoutingModule { }

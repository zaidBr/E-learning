import { SubscribtionCoursGuard } from './../service/subscribtion-cours.guard';
import { CoursContentComponent } from './cours-space/cours-content/cours-content.component';
import { CommentsCoursComponent } from './cours-space/comments-cours/comments-cours.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCourseResolverService } from '../service/resolver/all-course/all-course-resolver.service';
import { AllCoursComponent } from './all-cours/all-cours.component';
import { ChapterListComponent } from './cours-space/chapter-list/chapter-list.component';
import { CoursSpaceComponent } from './cours-space/cours-space.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { ManageCartComponent } from './manage-cart/manage-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicSpaceComponent } from './public-space/public-space.component';
import { InsideCoursComponent } from './cours-space/inside-cours/inside-cours.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { SondageComponent } from './sondage/sondage.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { StudentGuard } from '../service/student/student.guard';
import { QuizComponent } from './cours-space/inside-cours/quiz/quiz.component';

const routes: Routes = [

  {path:'',component:PublicSpaceComponent,children:[
    {path:'',component:HomeComponent},
    {path:'sondage',component:SondageComponent},
    {path:'cart',component:ManageCartComponent},
    {path:'my-courses', component:MyCoursesComponent},
    {path:'payment-result',component:PaymentResultComponent},
    {path:'profile',component:ProfileComponent},
    {path:'edit-profile', component:EditProfileComponent},
    {path:'all-courses', component:AllCoursComponent,resolve:{courses:AllCourseResolverService}},
    {path:'cours-space/:id', component:CoursSpaceComponent, children:[
      {path:'cours-content/:chapter',component:InsideCoursComponent,canActivate:[StudentGuard]},
      {path:'quiz',component:QuizComponent},/** impl guard */
      {path:'',component:ChapterListComponent,children:[
        {path:'',component:CommentsCoursComponent},
        {path:'specification', component:CoursContentComponent}
      ]},
      
    ]}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

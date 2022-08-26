import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { BestTeacherComponent } from './best-teacher/best-teacher.component';
import { PuppularCoursComponent } from './puppular-cours/puppular-cours.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {RatingModule} from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OurCategorieComponent } from './our-categorie/our-categorie.component';
import { FooterComponent } from './footer/footer.component';
import { ManageCartComponent } from './manage-cart/manage-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PublicSpaceComponent } from './public-space/public-space.component';
import {DialogModule} from 'primeng/dialog';
import { AuthModule } from '../auth/auth.module';
import { AllCoursComponent } from './all-cours/all-cours.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoursSpaceComponent } from './cours-space/cours-space.component';
import { ChapterListComponent } from './cours-space/chapter-list/chapter-list.component';
import { CommentsCoursComponent } from './cours-space/comments-cours/comments-cours.component';
import { CoursContentComponent } from './cours-space/cours-content/cours-content.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { InsideCoursComponent } from './cours-space/inside-cours/inside-cours.component';
import { CommentManageComponent } from './cours-space/inside-cours/comment-manage/comment-manage.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { SondageComponent } from './sondage/sondage.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { QuizComponent } from './cours-space/inside-cours/quiz/quiz.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    OurServiceComponent,
    BestTeacherComponent,
    PuppularCoursComponent,
    OurCategorieComponent,
    FooterComponent,
    ManageCartComponent,
    ProfileComponent,
    EditProfileComponent,
    PublicSpaceComponent,
    AllCoursComponent,
    SearchPipePipe,
    CoursSpaceComponent,
    ChapterListComponent,
    CommentsCoursComponent,
    CoursContentComponent,
    InsideCoursComponent,
    CommentManageComponent,
    PaymentResultComponent,
    SondageComponent,
    MyCoursesComponent,
    QuizComponent,
    
    
    
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    StudentRoutingModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    AuthModule,
    NgxStarRatingModule,
    AngularEditorModule



  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class StudentModule { }

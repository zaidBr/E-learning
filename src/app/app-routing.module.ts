import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminGuard } from './service/guards/admin.guard';
import { TestComponent } from './test/test.component';
import { TeacherGuard } from './service/teacher.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'test', component: TestComponent},
  {
    path:'auth',component:AuthComponent ,
    children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
    ]
    
  },
  
  {
  path: 'admin-dashboard',
  loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
  canLoad: [AdminGuard]
  },
  {
    path:'teacher-dashboard',
    loadChildren: () =>import('./teacher-dashboard/teacher-dashboard.module').then(m => m.TeacherDashboardModule),
    canLoad: [TeacherGuard]
    
  },
  {
    path:'student',
    loadChildren: () =>import('./student/student.module').then(m =>m.StudentModule),
    
  },

  
  { path: '',   redirectTo: '/student', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true,
      preloadingStrategy: PreloadAllModules
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

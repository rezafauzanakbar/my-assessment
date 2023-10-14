import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './services/auth.service';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AssessmentDetailComponent } from './pages/assessment/assessment-detail/assessment-detail.component';
import { AssessmentCreateComponent } from './pages/assessment/assessment-create/assessment-create.component';
import { ResultComponent } from './pages/result/result.component';
import { ParticipantAllComponent } from './pages/participant-all/participant-all.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'assessment-detail/:id',
    component: AssessmentDetailComponent
    // canActivate: [authGuard]
  },
  {
    path: 'assessment-create',
    component: AssessmentCreateComponent
    // canActivate: [authGuard]
  },
  {
    path: 'result',
    component: ResultComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'participant',
    component: ParticipantAllComponent,
    // canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

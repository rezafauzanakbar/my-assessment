import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AssessmentDetailComponent } from './pages/assessment/assessment-detail/assessment-detail.component';
import { AssessmentCreateComponent } from './pages/assessment/assessment-create/assessment-create.component';
import { QuestionComponent } from './component/question/question.component';
import { ParticipantComponent } from './component/participant/participant.component';
import { ResultComponent } from './pages/result/result.component';
import { ParticipantAllComponent } from './pages/participant-all/participant-all.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    AssessmentDetailComponent,
    AssessmentCreateComponent,
    QuestionComponent,
    ParticipantComponent,
    ResultComponent,
    ParticipantAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

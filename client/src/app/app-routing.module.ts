import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from "./components/home/home.component"
import { DashboardComponent} from "./components/dashboard/dashboard.component"
import { RegisterComponent} from "./components/register/register.component"
import { ProfileComponent} from "./components/profile/profile.component"
import { LoginComponent} from "./components/login/login.component"
import { AuthGuard} from "./guards/auth.guard"
import { NotAuthGuard } from "./guards/notAuth.guard"
import { EditProfileComponent} from "./components/profile/edit-profile/edit-profile.component"
import { ConfirmationComponent } from "./components/confirmation/confirmation/confirmation.component"
import { EditConfirmationComponent} from "./components/confirmation/edit-confirmation/edit-confirmation.component"


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},// , canActivate: [AuthGuard]
  { path: 'register', component: RegisterComponent },//, canActivate: [NotAuthGuard]
  { path: 'profile', component: ProfileComponent },//, canActivate: [AuthGuard]
  { path: 'edit-profile/:id', component: EditProfileComponent},//, canActivate:[AuthGuard]
  { path: 'confirmCode/:id', component: ConfirmationComponent},//, canActivate:[NotAuthGuard]
  { path: 'edit-confirm/:id', component: EditConfirmationComponent}, //, canActivate:[NotAuthGuard]
  { path: 'login', component: LoginComponent},//, canActivate: [NotAuthGuard]
  { path: '', component:HomeComponent}, //inject home component
  { path: '**', component: HomeComponent } //any other paths
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }

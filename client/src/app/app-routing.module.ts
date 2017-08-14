import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from "./components/home/home.component"
import { DashboardComponent} from "./components/dashboard/dashboard.component"
import { RegisterComponent} from "./components/register/register.component"
import { ProfileComponent} from "./components/profile/profile.component"
import { LoginComponent} from "./components/login/login.component"


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent},
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

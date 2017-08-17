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
import { BookingListComponent } from "./components/booking-list/booking-list.component"
import { DeleteConfirmationComponent } from "./components/confirmation/delete-confirmation/delete-confirmation.component"
import { CustomerListComponent } from "./components/customer-list/customer-list.component"
import { CustomerComponent } from "./components/customer-list/customer/customer.component"

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},// , canActivate: [AuthGuard]
  { path: 'register', component: RegisterComponent },//, canActivate: [NotAuthGuard]
  { path: 'profile', component: ProfileComponent },//, canActivate: [AuthGuard]
  { path: 'edit-profile', component: EditProfileComponent},//, canActivate:[AuthGuard]
  { path: 'confirmCode/:id', component: ConfirmationComponent},//, canActivate:[NotAuthGuard]
  { path: 'edit-confirm/:id', component: EditConfirmationComponent}, //, canActivate:[NotAuthGuard]
  { path: 'remove-confirm/:id', component: DeleteConfirmationComponent}, //, canActivate:[NotAuthGuard]
  { path: 'booking-list', component: BookingListComponent}, //, canActivate:[AuthGuard]
  { path: 'login', component: LoginComponent},//, canActivate: [NotAuthGuard]
  { path: 'customer-list', component: CustomerComponent}, //, canActivate:[AuthGuard]
  { path: '', component:HomeComponent},
  { path: '**', component: HomeComponent },
];



@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }

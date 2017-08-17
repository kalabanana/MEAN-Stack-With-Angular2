import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms"
import { NgModule } from '@angular/core';
import { AppRoutingModule} from "./app-routing.module";
import { HttpModule} from "@angular/http"
import { FormsModule} from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { NgxPaginationModule } from "ngx-pagination"


import { AppComponent } from './app.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent} from "./components/home/home.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectComponent } from './components/select/select.component';
import { EntercodeComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReserveFormComponent } from './components/reserve-form/reserve-form.component';
import { RegisterComponent} from "./components/register/register.component";
import { LoginComponent} from "./components/login/login.component"
import { ProfileComponent } from "./components/profile/profile.component";
import { BookingListComponent } from "./components/booking-list/booking-list.component"
import { EditProfileComponent } from "./components/profile/edit-profile/edit-profile.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation/confirmation.component";
import { EditConfirmationComponent } from "./components/confirmation/edit-confirmation/edit-confirmation.component"
import { DeleteConfirmationComponent } from "./components/confirmation/delete-confirmation/delete-confirmation.component"

import { AuthService} from "./services/auth.service";
import { BookService} from "./services/book.service";
import {AllBookingService} from "./services/all-booking.service";


import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";
import { TableViewComponent } from "./components/table/table-view/table-view.component";
import { CustomerComponent } from "./components/customer-list/customer/customer.component";
import { CustomerListComponent } from "./components/customer-list/customer-list.component"


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    SelectComponent,
    EntercodeComponent,
    FooterComponent,
    ReserveFormComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    EditProfileComponent,
    ConfirmationComponent,
    EditConfirmationComponent,
    BookingListComponent,
    TableViewComponent,
    DeleteConfirmationComponent,
    CustomerComponent,
    CustomerListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    NgxPaginationModule,
  ],
  providers: [ AuthService, BookService, AuthGuard, NotAuthGuard, AllBookingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms"
import { FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import { AppRoutingModule} from "./app-routing.module";
import { HttpModule} from "@angular/http"


import { AppComponent } from './app.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent} from "./components/home/home.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectComponent } from './components/select/select.component';
import { EntercodeComponent } from './components/confirmation/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReserveFormComponent } from './components/reserve-form/reserve-form.component';
import { RegisterComponent} from "./components/register/register.component";
//import { LoginComponent} from "./components/login/login.component"

import { AuthService} from "./services/auth.service";

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
    //LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //FormsModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

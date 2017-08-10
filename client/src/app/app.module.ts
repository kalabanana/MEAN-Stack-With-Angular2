import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms"
import { FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';


import { HttpModule} from "@angular/http"
import { AppComponent } from './app.component';
import { AppRoutingModule} from "./app-routing.module";
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent} from "./components/home/home.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectComponent } from './components/select/select.component';
import { EntercodeComponent } from './components/confirmation/entercode/entercode.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReserveFormComponent } from './components/reserve-form/reserve-form.component';
import { RegisterComponent} from "./components/register/register.component";


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //FormsModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

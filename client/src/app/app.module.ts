import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { HttpModule} from "@angular/http"
import { FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { AppRoutingModule} from "./app-routing.module";
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent} from "./components/home/home.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectComponent } from './components/select/select.component';
import { EntercodeComponent } from './components/confirmation/entercode/entercode.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReserveFormComponent } from './components/reserve-form/reserve-form.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

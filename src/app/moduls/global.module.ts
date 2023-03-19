import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from '../pages/log-in/log-in.component';
import { SingUpComponent } from '../pages/sing-up/sing-up.component';
import { MainComponent } from '../pages/main/main.component';
import { CreateUpdateComponent } from '../pages/create-update/create-update.component';
import { DetailsComponent } from '../pages/details/details.component';
import { HomeComponent } from '../pages/home/home.component';
import { SignComponent } from '../components/sign/sign.component';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ReviewComponent } from '../components/review/review.component';
import { MatCardModule } from '@angular/material/card';
import { Error404Component } from '../pages/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    LogInComponent,
    SingUpComponent,
    MainComponent,
    CreateUpdateComponent,
    DetailsComponent,
    HomeComponent,
    SignComponent,
    HeaderComponent,
    FooterComponent,
    ReviewComponent,
    Error404Component
  ]
})
export class GlobalModule { }

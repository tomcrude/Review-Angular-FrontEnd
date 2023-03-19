import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { homeGuard } from './guards/home';
import { signGuard } from './guards/sign';
import { CreateUpdateComponent } from './pages/create-update/create-update.component';
import { DetailsComponent } from './pages/details/details.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MainComponent } from './pages/main/main.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';

const routes: Routes = [
  {path: "", component: MainComponent,canActivate:[signGuard]},
  {path: "logIn", component: LogInComponent,canActivate:[signGuard]},
  {path: "signUp", component: SingUpComponent,canActivate:[signGuard]},

  {path: "home", component: HomeComponent,canActivate:[homeGuard]},
  {path: "home/details/:id", component: DetailsComponent,canActivate:[homeGuard]},
  {path: "home/update-create/:id", component: CreateUpdateComponent,canActivate:[homeGuard]},

  {path: "**", component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

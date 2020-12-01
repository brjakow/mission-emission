import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineComponent } from './components/airline/airline.component';
import { LoginComponent } from './components/login/login.component';
import { CaComponent } from './components/ca/ca.component';
import { VerifierComponent } from './components/verifier/verifier.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'airline',
    component: AirlineComponent,
  },
  {
    path: 'ca',
    component: CaComponent,
  },
  {
    path: 'verifier',
    component: VerifierComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

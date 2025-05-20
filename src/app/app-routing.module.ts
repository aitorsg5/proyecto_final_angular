import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';




const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'coches', component: ListaDeCochesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

  { path: 'index', component: IndexComponent },

 // { path: 'usuarios', component: UsuarioComponent, canActivate: [AdminGuard] }, // Añade el guardia de ruta aquí










];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

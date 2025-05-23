import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';
import { LoginComponent } from './login/login.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CestaComponent } from './cesta/cesta.component';
import { PerfilComponent } from './perfil/perfil.component';

import { RegisterComponent } from './register/register.component';




const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'coches', component: ListaDeCochesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
      {   path: 'configuracion/:id',
  component: ConfiguracionComponent  },

  { path: 'Cesta', component: CestaComponent },
  { path: 'perfil', component: PerfilComponent },

  { path: 'index', component: IndexComponent },

 // { path: 'usuarios', component: UsuarioComponent, canActivate: [AdminGuard] }, // Añade el guardia de ruta aquí










];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

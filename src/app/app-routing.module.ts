import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorFormComponent } from './components/colaborador-form/colaborador-form.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { EntradaFormComponent } from './components/entrada-form/entrada-form.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { HomeComponent } from './components/home/home.component';
import { ListDniColaboradorComponent } from './components/list-dni-colaborador/list-dni-colaborador.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotfundComponent } from './components/page-notfund/page-notfund.component';
import { PatrimonioFormComponent } from './components/patrimonio-form/patrimonio-form.component';
import { PatrimonioComponent } from './components/patrimonio/patrimonio.component';
import { SalidaFormComponent } from './components/salida-form/salida-form.component';
import { SalidaComponent } from './components/salida/salida.component';

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '*', component: PageNotfundComponent},


  {path: 'colaborador', component: ColaboradorComponent},
{path:'colaborador/formsColaborador', component: ColaboradorFormComponent},
{path:'colaborador/formsColaborador/:id', component: ColaboradorFormComponent},

{path: 'patrimonio', component: PatrimonioComponent},
{path:'patrimonio/formsPatrimonio', component: PatrimonioFormComponent},
{path:'patrimonio/formsPatrimonio/:id', component: PatrimonioFormComponent},

{path: 'entrada', component: EntradaComponent},
{path:'entrada/formsEntrada', component: EntradaFormComponent},
{path:'entrada/formsEntrada/:id', component: EntradaFormComponent},

{path: 'salida', component: SalidaComponent},
{path:'salida/formsSalida', component: SalidaFormComponent},
{path:'salida/formsSalida/:id', component: SalidaFormComponent},
{path:'listColaboradorDni/formsSalida/:id', component: SalidaFormComponent},

{path: 'listColaboradorDni', component: ListDniColaboradorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

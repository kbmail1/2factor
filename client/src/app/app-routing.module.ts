import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HelloComponent } from './components/hello/hello.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'api/hello', component: HelloComponent, canActivate: [AuthGuard] },
  { path: 'api/hello/:id', component: HelloComponent, canActivate: [AuthGuard]},
  { path: '404', component: PagenotfoundComponent},
  { path: '**', redirectTo: '/404'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

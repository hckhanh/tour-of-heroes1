import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component'
import { HeroesDashboardComponent } from '../heroes-dashboard/heroes-dashboard.component'
import { HeroesComponent } from '../heroes/heroes.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: HeroesDashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}

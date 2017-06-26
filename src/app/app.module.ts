import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroService } from './hero.service'
import { HeroesDashboardComponent } from './heroes-dashboard/heroes-dashboard.component'
import { HeroesComponent } from './heroes/heroes.component'

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
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroesDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

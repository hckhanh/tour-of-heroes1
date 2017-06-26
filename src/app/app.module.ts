import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { AppComponent } from './app.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroSearchComponent } from './hero-search/hero-search.component'
import { HeroService } from './hero.service'
import { HeroesDashboardComponent } from './heroes-dashboard/heroes-dashboard.component'
import { HeroesComponent } from './heroes/heroes.component'
import { InMemoryDataService } from './in-memory-data.service'
import { RoutingModule } from './routing/routing.module'

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroesDashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RoutingModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

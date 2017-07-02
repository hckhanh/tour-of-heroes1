import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroService } from '../hero.service'
import { HeroServiceStub } from '../hero.service.stub'
import { HEROES_DATA } from '../mockup-data'
import { HeroesDashboardComponent } from './heroes-dashboard.component'

@Component({ selector: 'app-hero-search', template: '' })
class HeroSearchComponent {
}

describe('HeroesDashboardComponent', () => {
  let component: HeroesDashboardComponent
  let fixture: ComponentFixture<HeroesDashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroesDashboardComponent, HeroSearchComponent],
        imports: [RouterTestingModule]
      })
      .overrideComponent(HeroesDashboardComponent, {
        set: {
          providers: [
            { provide: HeroService, useClass: HeroServiceStub }
          ]
        }
      })
      .compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeroesDashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should show 4 heroes of heroes list', () => {
    expect(component.heroes).toEqual(HEROES_DATA.slice(1, 5))
  })
})

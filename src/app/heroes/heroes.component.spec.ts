import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroServiceStub } from '../hero-service.stub'
import { HeroService } from '../hero.service'
import { HEROES_DATA } from '../mockup-data'
import { HeroesComponent } from './heroes.component'

describe('HeroesComponent', () => {
  let component: HeroesComponent
  let fixture: ComponentFixture<HeroesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroesComponent],
        imports: [RouterTestingModule]
      })
      .overrideComponent(HeroesComponent, {
        set: {
          providers: [
            { provide: HeroService, useClass: HeroServiceStub }
          ]
        }
      })
      .compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeroesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should show the list of heroes', () => {
    expect(component.heroes).toEqual(HEROES_DATA)
  })
})

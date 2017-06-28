import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroService } from '../hero.service'
import { HEROES_DATA } from '../mockup-data'
import { HeroDetailComponent } from './hero-detail.component'
import createSpy = jasmine.createSpy

class HeroServiceStub {
  getHero = createSpy('getHero').and.callFake(() =>
    Promise
      .resolve(true)
      .then(() => Object.assign({}, HEROES_DATA[0]))
  )
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent
  let fixture: ComponentFixture<HeroDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroDetailComponent],
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        providers: [
          { provide: HeroService, useClass: HeroServiceStub }
        ]
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent)
    component = fixture.componentInstance
    // component.hero = HEROES_DATA[0]
    // const expectedHero = new Hero(42, 'Test Name')
    // component.hero = expectedHero
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})

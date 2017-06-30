import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable } from 'rxjs/Observable'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'
import { HeroDetailComponent } from './hero-detail.component'
import createSpy = jasmine.createSpy

const HERO: Hero = { id: 11, name: 'Mr. Nice' }

const params: Params = {
  id: HERO.id
}

class HeroServiceStub {
  getHero = createSpy('getHero').and.callFake(() => Promise.resolve(Object.assign({}, HERO)))
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
      })
      .overrideComponent(HeroDetailComponent, {
        set: {
          providers: [
            { provide: HeroService, useClass: HeroServiceStub },
            { provide: ActivatedRoute, useValue: { params: Observable.of(params) } }
          ]
        }
      })
      .compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeroDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should load the hero with id = 11', () => {
    expect(component.hero).toEqual(HERO)
  })
})

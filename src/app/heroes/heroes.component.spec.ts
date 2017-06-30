import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroServiceStub } from '../hero-service.stub'
import { HeroService } from '../hero.service'
import { HEROES_DATA } from '../mockup-data'
import { HeroesComponent } from './heroes.component'
import { createCustomEvent } from '../utils.spec'

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

  it('should add a new hero the list of heroes', fakeAsync(() => {
    const inputElement = fixture.debugElement.query(By.css('.add-hero-input')).nativeElement

    inputElement.value = 'Invoker'
    inputElement.dispatchEvent(createCustomEvent('input'))
    fixture.nativeElement.querySelector('button').click()

    tick(300)
    fixture.detectChanges()

    expect(component.heroes.length).toEqual(HEROES_DATA.length + 1)
    expect(fixture.nativeElement.querySelector('ul').childElementCount).toBe(HEROES_DATA.length + 1)
  }))
})

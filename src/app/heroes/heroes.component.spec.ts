import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroService } from '../hero.service'
import { HeroServiceStub } from '../hero.service.stub'
import { HEROES_DATA } from '../mockup-data'
import { createCustomEvent } from '../utils.spec'
import { HeroesComponent } from './heroes.component'

describe('HeroesComponent', () => {
  let component: HeroesComponent
  let fixture: ComponentFixture<HeroesComponent>
  let service: any

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
    service = fixture.debugElement.injector.get(HeroService)
    fixture.detectChanges()
  }))

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should show the list of heroes', () => {
    expect(component.heroes).toEqual(HEROES_DATA)
  })

  it('should add a new hero to the list of heroes', fakeAsync(() => {
    const inputElement = fixture.debugElement.query(By.css('.add-hero-input')).nativeElement

    inputElement.value = 'Invoker'
    inputElement.dispatchEvent(createCustomEvent('input'))
    fixture.nativeElement.querySelector('button').click()

    tick(300)
    fixture.detectChanges()

    expect(service.create).toHaveBeenCalled()
    expect(component.heroes.length).toEqual(HEROES_DATA.length + 1)
    expect(fixture.nativeElement.querySelector('ul').childElementCount).toBe(HEROES_DATA.length + 1)
  }))

  it('should show the selected hero on list of heroes', () => {
    fixture.detectChanges()

    const firstElement = fixture.nativeElement.querySelector('ul').children[0]
    firstElement.click()

    expect(component.selectedHero).toEqual(HEROES_DATA[0])
  })

  it('should delete first hero on list of heroes', fakeAsync(() => {
    fixture.detectChanges()

    const firstElement = fixture.nativeElement.querySelector('ul').children[0]
    const deleteButtonElement = firstElement.getElementsByClassName('delete')[0]

    deleteButtonElement.click()

    tick(300)
    fixture.detectChanges()

    expect(service.remove).toHaveBeenCalled()
    expect(component.heroes.length).toBe(HEROES_DATA.length - 1)
  }))
})

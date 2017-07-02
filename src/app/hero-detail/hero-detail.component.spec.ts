import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable } from 'rxjs/Observable'
import { HeroService } from '../hero.service'
import { HeroServiceStub } from '../hero.service.stub'
import { HEROES_DATA } from '../mockup-data'
import { createCustomEvent } from '../utils.spec'
import { HeroDetailComponent } from './hero-detail.component'
import createSpy = jasmine.createSpy

const params: Params = {
  id: HEROES_DATA[0].id
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent
  let fixture: ComponentFixture<HeroDetailComponent>
  let service: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroDetailComponent],
        imports: [
          RouterTestingModule,
          FormsModule
        ]
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
    service = fixture.debugElement.injector.get(HeroService)
    fixture.detectChanges()
  }))

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should load the hero (id: 11)', () => {
    expect(component.hero).toEqual(HEROES_DATA[0])
  })

  it('should save new name for the hero (id: 11)', () => {
    fixture.detectChanges()
    const inputElement = fixture.nativeElement.querySelector('input')

    inputElement.value = 'New Name'
    inputElement.dispatchEvent(createCustomEvent('input'))
    component.save()

    expect(service.update).toHaveBeenCalled()
    expect(component.hero.name).toBe('New Name')
  })

  it('should delete the hero (id: 11)', () => {
    component.remove()
    expect(service.remove).toHaveBeenCalled()
  })
})

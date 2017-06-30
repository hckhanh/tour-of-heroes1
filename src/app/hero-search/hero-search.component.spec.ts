import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { HeroSearchServiceStub } from '../hero-search-service.stub'
import { HeroSearchService } from '../hero-search.service'
import { HEROES_DATA } from '../mockup-data'
import { HeroSearchComponent } from './hero-search.component'

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent
  let fixture: ComponentFixture<HeroSearchComponent>
  let service: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroSearchComponent],
        imports: [
          RouterTestingModule,
          FormsModule
        ]
      })
      .overrideComponent(HeroSearchComponent, {
        set: {
          providers: [
            { provide: HeroSearchService, useClass: HeroSearchServiceStub }
          ]
        }
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent)
    component = fixture.componentInstance
    service = fixture.debugElement.injector.get(HeroSearchService)
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it(`#search should return the search result of 'A'`, fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input')

    inputElement.value = 'A'
    inputElement.dispatchEvent(new Event('input'))
    inputElement.dispatchEvent(new Event('keyup'))

    tick(300)
    fixture.detectChanges()

    expect(service.search).toHaveBeenCalled()
    expect(fixture.debugElement.queryAll(By.css('.search-result')).length)
      .toBe(HEROES_DATA.filter(hero => hero.name.search(/A/i) !== -1).length)
  }))
})

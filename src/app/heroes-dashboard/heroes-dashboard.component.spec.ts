import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HeroesDashboardComponent } from './heroes-dashboard.component'

describe('HeroesDashboardComponent', () => {
  let component: HeroesDashboardComponent
  let fixture: ComponentFixture<HeroesDashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HeroesDashboardComponent]
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesDashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})

import createSpy = jasmine.createSpy
import { Observable } from 'rxjs/Observable'
import { HEROES_DATA } from './mockup-data'
export class HeroSearchServiceStub {
  search = createSpy('search').and.callFake((term: string) =>
    Observable.of(
      HEROES_DATA.filter(
        hero => hero.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
      )
    )
  )
}

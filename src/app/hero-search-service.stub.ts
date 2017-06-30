import createSpy = jasmine.createSpy
import { Observable } from 'rxjs/Observable'
export class HeroSearchServiceStub {
  search = createSpy('search').and.callFake(() => {
    console.log('SEARCH HERE')
    return Observable.of([
      { id: 1, name: '1' },
      { id: 2, name: '2' }
    ])
  })
}

import createSpy = jasmine.createSpy
import { HEROES_DATA } from './mockup-data'

export class HeroServiceStub {
  getHero = createSpy('getHero').and.callFake(() =>
    Promise.resolve(Object.assign({}, HEROES_DATA[0]))
  )

  getHeroes = createSpy('getHeroes').and.callFake(() =>
    Promise.resolve(HEROES_DATA.slice())
  )
}

import createSpy = jasmine.createSpy
import { HEROES_DATA } from './mockup-data'

const HEROES_SERVICE_DATA = HEROES_DATA.slice()

export class HeroServiceStub {
  getHero = createSpy('getHero').and.callFake(() =>
    Promise.resolve(Object.assign({}, HEROES_SERVICE_DATA[0]))
  )

  getHeroes = createSpy('getHeroes').and.callFake(() =>
    Promise.resolve(HEROES_SERVICE_DATA.slice())
  )

  create = createSpy('create').and.callFake((name: string) => {
    HEROES_SERVICE_DATA.push({ id: 100, name })
    return Promise.resolve(HEROES_SERVICE_DATA)
  })
}

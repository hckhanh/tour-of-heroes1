import createSpy = jasmine.createSpy
import { Hero } from './hero'
import { HEROES_DATA } from './mockup-data'

export class HeroServiceStub {
  private heroes: Hero[]

  getHero = createSpy('getHero').and.callFake(() =>
    Promise.resolve(Object.assign({}, this.heroes[0]))
  )

  getHeroes = createSpy('getHeroes').and.callFake(() =>
    Promise.resolve(this.heroes.slice())
  )

  create = createSpy('create').and.callFake((name: string) => {
    this.heroes = [...this.heroes, { id: 100, name }]
    return Promise.resolve(this.heroes)
  })

  update = createSpy('update').and.callFake((hero: Hero) => {
    this.heroes[0] = Object.assign({}, hero)
    return Promise.resolve(this.heroes[0])
  })

  remove = createSpy('remove').and.callFake((hero: Hero) => {
    this.heroes = this.heroes.filter(h => h.id !== hero.id)
    return Promise.resolve()
  })

  constructor() {
    this.heroes = [...HEROES_DATA]
  }
}

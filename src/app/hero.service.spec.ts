import { async, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { Hero } from './hero'
import { HeroService } from './hero.service'
import { InMemoryDataService } from './in-memory-data.service'
import { HEROES_DATA } from './mockup-data'

describe('HeroService', () => {
  let heroService: HeroService

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      providers: [HeroService]
    })

    heroService = injector.get(HeroService)
  })

  it('should be created', (() => {
    expect(heroService).toBeTruthy()
  }))

  it('#getHeroes should get a list of Heroes', async(() => {
    heroService
      .getHeroes()
      .then(heroes => expect(heroes).toEqual(HEROES_DATA))
  }))

  it('#getHeroes get a hero (id: 20) in database', async(() => {
    const expectedHero = HEROES_DATA.find((hero: Hero) => hero.id === 20)
    heroService
      .getHero(20)
      .then(hero => expect(hero).toEqual(expectedHero))
  }))

  it('#getHeroes get a hero (id: -1) does not existed in database', async(() => {
    heroService
      .getHero(-1)
      .catch(error => expect(error).toBeTruthy())
  }))
})

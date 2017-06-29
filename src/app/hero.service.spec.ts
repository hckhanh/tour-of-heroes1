import { async, inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { Hero } from './hero'
import { HeroService } from './hero.service'
import { InMemoryDataService } from './in-memory-data.service'
import { HEROES_DATA } from './mockup-data'

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      providers: [HeroService]
    })
  })

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy()
  }))

  it('#getHeroes should get a list of Heroes', async(inject([HeroService], (service: HeroService) => {
    service
      .getHeroes()
      .then(heroes => expect(heroes).toEqual(HEROES_DATA))
  })))

  it('#getHeroes get a hero (id: 20) in database', async(inject([HeroService], (service: HeroService) => {
    const expectedHero = HEROES_DATA.find((hero: Hero) => hero.id === 20)
    service
      .getHero(20)
      .then(hero => expect(hero).toEqual(expectedHero))
  })))

  it('#getHeroes get a hero (id: -1) does not existed in database', async(inject([HeroService], (service: HeroService) => {
    service
      .getHero(-1)
      .catch(error => expect(error).toBeTruthy())
  })))
})

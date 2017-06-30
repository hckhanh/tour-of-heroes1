import { async, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { Hero } from './hero'
import { HeroSearchService } from './hero-search.service'
import { InMemoryDataService } from './in-memory-data.service'
import { HEROES_DATA } from './mockup-data'

describe('HeroSearchService', () => {
  let service: HeroSearchService

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      providers: [HeroSearchService]
    })

    service = injector.get(HeroSearchService)
  })

  it('should be created', async(() => {
    expect(service).toBeTruthy()
  }))

  it(`#search should return result of heroes with name 'A'`, async(() => {
    const searchResults = HEROES_DATA.filter(hero => hero.name.match(/A/i))

    service
      .search('A')
      .subscribe((heroes: Hero[]) => expect(heroes).toEqual(searchResults))
  }))

  it(`#search should return empty result of heroes with name 'W'`, async(() => {
    service
      .search('W')
      .subscribe((heroes: Hero[]) => expect(heroes).toEqual([]))
  }))
})

import { fakeAsync, TestBed } from '@angular/core/testing'
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Hero } from './hero'
import { HeroSearchService } from './hero-search.service'

describe('HeroSearchService', () => {
  let backend: MockBackend
  let connection: any
  let heroSearchService: HeroSearchService

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        HeroSearchService
      ]
    })

    backend = injector.get(ConnectionBackend) as MockBackend
    backend.connections.subscribe((con: any) => connection = con)
    heroSearchService = injector.get(HeroSearchService)
  })

  it('should be created', () => {
    expect(heroSearchService).toBeTruthy()
  })

  it('#search should search heroes by name', fakeAsync(() => {
    let result: Hero[] = null

    heroSearchService
      .search('A')
      .subscribe((heroes: Hero[]) => result = heroes)

    connection.mockRespond(
      new Response(
        new ResponseOptions({ body: JSON.stringify({ data: [] }) })
      )
    )

    expect(connection.request.url).toMatch(/api\/heroes\?name=A$/)
    expect(result).toEqual([])
  }))
})

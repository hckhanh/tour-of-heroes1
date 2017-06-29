import { fakeAsync, inject, TestBed } from '@angular/core/testing'
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Hero } from './hero'
import { HeroSearchService } from './hero-search.service'

describe('HeroSearchService', () => {
  beforeEach(() => {
    this.injector = TestBed.configureTestingModule({
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        HeroSearchService
      ]
    })

    this.backend = this.injector.get(ConnectionBackend) as MockBackend
    this.backend.connections.subscribe((connection: any) => this.connection = connection)
  })

  it('should be created', fakeAsync(inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy()
  })))

  it('#search should search heroes by name', fakeAsync(inject([HeroSearchService], (service: HeroSearchService) => {
    let result = null

    service
      .search('A')
      .subscribe((heroes: Hero[]) => result = heroes)

    this.connection.mockRespond(new Response(
      new ResponseOptions({ body: JSON.stringify({ data: [] }) })
    ))

    expect(this.connection.request.url).toMatch(/api\/heroes\?name=A$/)
    expect(result).toEqual([])
  })))
})

import { fakeAsync, inject, TestBed } from '@angular/core/testing'
import { HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { Hero } from './hero'

import { HeroSearchService } from './hero-search.service'

describe('HeroSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        HeroSearchService,
        { provide: XHRBackend, useClass: MockBackend },
        MockBackend
      ]
    })
  })

  it('should be created', fakeAsync(inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy()
  })))

  it('#search should search heroes by name', fakeAsync(inject(
    [MockBackend, HeroSearchService],
    (backend: MockBackend, service: HeroSearchService) => {
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post)

        connection.mockRespond(new Response(
          new ResponseOptions({ body: [] })
        ))
      })

      service
        .search('A')
        .subscribe((heroes: Hero[]) => expect(heroes).toBeNull())
    })))
})

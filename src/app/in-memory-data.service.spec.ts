import { inject, TestBed } from '@angular/core/testing'

import { InMemoryDataService } from './in-memory-data.service'
import { HEROES_DATA } from './mockup-data'

describe('InMemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService]
    })
  })

  it('should be created', inject([InMemoryDataService], (service: InMemoryDataService) => {
    expect(service).toBeTruthy()
  }))

  it('should create database', inject([InMemoryDataService], (service: InMemoryDataService) => {
    expect(service.createDb()).toEqual({ heroes: HEROES_DATA })
  }))
})

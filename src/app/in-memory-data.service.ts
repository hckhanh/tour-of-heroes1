import { Injectable } from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { HEROES_DATA } from './mockup-data'

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    return { heroes: HEROES_DATA }
  }
}

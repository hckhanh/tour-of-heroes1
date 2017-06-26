import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'
import { Hero } from './hero'

@Injectable()
export class HeroService {
  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get('/api/heroes')
      .toPromise()
      .then(res => res.json().data as Hero[])
      .catch(this.handleError)
  }

  getHero(id: number): Promise<Hero> {
    return this.http
      .get(`/api/heroes/${id}`)
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    return this.http
      .put(`/api/heroes/${hero.id}`, JSON.stringify(hero))
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }

  create(heroName: string): Promise<Hero> {
    return this.http
      .post('/api/heroes', JSON.stringify({ name: heroName }))
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError)
  }

  remove(hero: Hero) {
    return this.http
      .delete(`/api/heroes/${hero.id}`)
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
}

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Hero } from '../hero'
import { HeroSearchService } from '../hero-search.service'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private router: Router, private heroSearchService: HeroSearchService) {
  }

  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error)
        return Observable.of<Hero[]>([])
      })
  }

  goDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id])
  }

  search(term: string): void {
    this.searchTerms.next(term)
  }
}

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]
  selectedHero: Hero

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  goDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
  }

  add(heroName: string): void {
    this.heroService
      .create(heroName)
      .then((hero: Hero) => this.heroes.push(hero))
  }

  remove(hero: Hero): void {
    this.heroService
      .remove(hero)
      .then(() => this.heroes = this.heroes.filter(h => h.id !== hero.id))
  }
}

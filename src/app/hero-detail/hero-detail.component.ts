import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    this.heroService
      .update(this.hero)
      .then(() => this.goBack())
  }

  remove(): void {
    this.heroService
      .remove(this.hero)
      .then(() => this.router.navigate(['/dashboard']))
  }
}

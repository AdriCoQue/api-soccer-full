import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LeaguesService } from '../../services';
import { FullLeague } from '../../models';
import { LeagueCardComponent } from '../league-card/league-card.component';

@Component({
  imports: [LeagueCardComponent],
  selector: 'app-leagues',
  styleUrl: './leagues.component.scss',
  templateUrl: './leagues.component.html',
})
export class LeaguesComponent implements OnInit{
  router = inject(Router);
  leagueService = inject(LeaguesService);
  leagues = signal<FullLeague[]>([]);

  ngOnInit(){
    this.leagueService.getAllLeagues().subscribe(data => {
      this.leagues.set(data);
    });
  }

  goToMenu(){
    this.router.navigateByUrl('menu');
  }

  goToNewLeague(){
    this.router.navigateByUrl('leagues/add')
  }
}

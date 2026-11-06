import { Component, inject, input } from '@angular/core';
import { FullLeague } from '../../models';
import { LeaguesService } from '../../services';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-league-card',
  styleUrl: './league-card.component.scss',
  templateUrl: './league-card.component.html',
})
export class LeagueCardComponent {
  league = input.required<FullLeague>();
  leagueService = inject(LeaguesService);
  router = inject(Router);

  editLeague(){
    this.router.navigateByUrl(`leagues/edit/${this.league().idleague}`);
  }

  deleteLeague(){
    this.leagueService.disableLeague(this.league().idleague).subscribe();
  }
}

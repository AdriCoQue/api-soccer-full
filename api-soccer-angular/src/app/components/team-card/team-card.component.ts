import { Component, inject, input } from '@angular/core';
import { FullTeam } from '../../models';
import { Router } from '@angular/router';
import { TeamsService } from '../../services';

@Component({
  imports: [],
  selector: 'app-team-card',
  styleUrl: './team-card.component.scss',
  templateUrl: './team-card.component.html',
})
export class TeamCardComponent {
  team = input.required<FullTeam>();
  router = inject(Router);
  teamService = inject(TeamsService);

  editTeam(){
    this.router.navigateByUrl(`teams/edit/${this.team().idteam}`);
  }

  deleteTeam(){
    this.teamService.disableTeam(this.team().idteam).subscribe();
  }
}

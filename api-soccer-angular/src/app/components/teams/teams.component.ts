import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamsService } from '../../services';
import { Router } from '@angular/router';
import { FullTeam } from '../../models';
import { TeamCardComponent } from '../team-card/team-card.component';

@Component({
  imports: [TeamCardComponent],
  selector: 'app-teams',
  styleUrl: './teams.component.scss',
  templateUrl: './teams.component.html',
})
export class TeamsComponent implements OnInit {
  router = inject(Router);
  teamService = inject(TeamsService);
  teams = signal<FullTeam[]>([]);

  ngOnInit(){
    this.teamService.getAllTeams().subscribe(data =>{
      this.teams.set(data);
    })
  }

  goToMenu(){
    this.router.navigateByUrl('menu');
  }

  goToNewTeam(){
    this.router.navigateByUrl('teams/add')
  }

}

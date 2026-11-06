import { Component, inject, OnInit, signal } from '@angular/core';
import { LeaguesService, RegistersService, TeamsService } from '../../services';
import { Router } from '@angular/router';
import { FullLeague, FullTeam } from '../../models';
import { TeamRegister } from '../../models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-register',
  styleUrl: './add-register.component.scss',
  templateUrl: './add-register.component.html',
})
export class AddRegisterComponent implements OnInit{
  router = inject(Router);
  leagueService = inject(LeaguesService);
  teamService = inject(TeamsService);
  registerService = inject(RegistersService);
  leagues = signal<FullLeague[]>([]);
  teams = signal<FullTeam[]>([]);
  registerForm = new FormGroup({
    idleague: new FormControl(0,{nonNullable: true, validators: [Validators.required]}),
    idteam: new FormControl(0,{nonNullable: true, validators: [Validators.required]})
  });

  ngOnInit(){
    this.leagueService.getAllLeagues().subscribe(data => {
      this.leagues.set(data);
    });
    this.teamService.getAllTeams().subscribe(data=>{
      this.teams.set(data);
    });
  }

  OnSubmit(event: SubmitEvent){
    event.preventDefault();
    if(this.registerForm.valid){
      var idleague = Number(this.registerForm.value.idleague!);
      var idTeam = Number(this.registerForm.value.idteam!);
      this.registerTeam(idleague, idTeam);
    }
  }

  goBack(){
    this.router.navigateByUrl('registers');
  }

  registerTeam(idleague: number, idteam: number){ 
    var newRegister: TeamRegister = {
      idleague: idleague,
      idteam: idteam
    }
    this.registerService.addRegister(newRegister).subscribe(() => {
      this.goBack();
    });
  }
}

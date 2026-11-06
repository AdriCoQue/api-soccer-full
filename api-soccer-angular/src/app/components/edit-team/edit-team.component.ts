import { Component, inject, OnInit, signal } from '@angular/core';
import { EmptyTeam, FullTeam, Team } from '../../models';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../../services';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-team.component',
  styleUrl: './edit-team.component.scss',
  templateUrl: './edit-team.component.html',
})
export class EditTeamComponent implements OnInit {
  router = inject(Router);
  teamService = inject(TeamsService);
  teamId = signal<number>(0);
  team = signal<FullTeam>(EmptyTeam);
  private activatedRoute = inject(ActivatedRoute);
  teamForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    country: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    playersQuantity: new FormControl(0, {nonNullable: true, validators: [Validators.required, Validators.min(11), Validators.max(22)]})
  });

  constructor(){
    this.activatedRoute.params.subscribe((params) => {
      this.teamId.set(Number(params['id']));
    });
  }

  ngOnInit(){
    this.teamService.getTeam(this.teamId()).subscribe(t => {
      this.team.set(t);
      this.teamForm.setValue({
        name: this.team().name,
        country: this.team().country,
        playersQuantity: this.team().playersQuantity
        
      })
    });
  }

  goBack(){
    this.router.navigateByUrl('teams');
  }

  onSubmit(event: SubmitEvent){
    event.preventDefault();
    if(this.teamForm.valid){
      const name = this.teamForm.value.name!;
      const country = this.teamForm.value.country!;
      const playersQuantity = Number(this.teamForm.value.playersQuantity!);

      const newTeam: Team = {
        name: name,
        country: country,
        playersQuantity: playersQuantity
      }
      this.createTeam(newTeam);
    }
  }

  createTeam(team: Team){
    this.teamService.updateTeam(this.team().idteam, team).subscribe(()=>{
      this.goBack();
    });
  }
}

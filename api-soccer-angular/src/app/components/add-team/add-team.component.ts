import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from '../../services';
import { Team } from '../../models';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-team',
  styleUrl: './add-team.component.scss',
  templateUrl: './add-team.component.html',
})
export class AddTeamComponent {
  router = inject(Router);
  teamService = inject(TeamsService);

  teamForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    country: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    playersQuantity: new FormControl(0, {nonNullable: true, validators: [Validators.required, Validators.min(11), Validators.max(22)]})
  });

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
    this.teamService.addTeam(team).subscribe(()=>{
      this.goBack();
    });
  }
}

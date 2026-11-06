import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeaguesService } from '../../services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { League } from '../../models';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-league',
  styleUrl: './add-league.component.scss',
  templateUrl: './add-league.component.html',
})
export class AddLeagueComponent {
  router = inject(Router);
  leagueService = inject(LeaguesService);
  leagueForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    country: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    startDate: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    endDate: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });
  dateError: boolean = false;

  goBack(){
    this.router.navigateByUrl('leagues');
  }

  onSubmit(event: SubmitEvent){
    event.preventDefault();
    if(this.leagueForm.valid){
      const name = this.leagueForm.value.name!;
      const country = this.leagueForm.value.country!;
      const startDate = this.leagueForm.value.startDate!;
      const endDate = this.leagueForm.value.endDate!;

      const start = new Date(startDate);
      const end = new Date(endDate);
      if(start>end){
        this.dateError = true;
        throw new Error("La fecha de inicio no puede ocurrir despues de la fecha de fin");
      }
      this.dateError = false;
      const newLeague: League = {
        name: name,
        country: country,
        startDate: startDate,
        endDate: endDate
      }
      
      this.addLeague(newLeague);
    }

  }

  addLeague(league: League){
    this.leagueService.addLeague(league).subscribe(()=>{
      this.goBack();
    })
  }
}

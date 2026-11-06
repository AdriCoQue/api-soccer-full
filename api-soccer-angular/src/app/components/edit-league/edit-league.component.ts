import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaguesService } from '../../services';
import { EmptyLeague, FullLeague, League } from '../../models';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-league.component',
  styleUrl: './edit-league.component.scss',
  templateUrl: './edit-league.component.html',
})
export class EditLeagueComponent implements OnInit {
  router = inject(Router);
  leagueId = signal<number>(0);
  league = signal<FullLeague>(EmptyLeague);
  private activatedRoute = inject(ActivatedRoute);
  leagueService = inject(LeaguesService);
  leagueForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    country: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]}),
    startDate: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    endDate: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });
  dateError: boolean = false;

  constructor(){
    this.activatedRoute.params.subscribe((params) => {
      this.leagueId.set(Number(params['id']));
    });
  }

  ngOnInit(){
    this.leagueService.getLeague(this.leagueId()).subscribe(l => {
      this.league.set(l);
      this.leagueForm.setValue({
        name: this.league().name,
        country: this.league().country,
        startDate: this.league().startDate,
        endDate: this.league().endDate
      })
    });
  }

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
      const editedLeague: League = {
        name: name,
        country: country,
        startDate: startDate,
        endDate: endDate
      }
      
      this.editLeague(editedLeague);
    }

  }

  editLeague(league: League){
    this.leagueService.updateLeague(this.league().idleague, league).subscribe(()=>{
      this.goBack();
    })
  }
}

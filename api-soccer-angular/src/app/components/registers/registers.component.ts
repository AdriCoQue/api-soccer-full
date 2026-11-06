import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RegistersService } from '../../services';
import { RegisteredTeam } from '../../models';
import { RegisterCardComponent } from '../register-card/register-card.component';

@Component({
  imports: [RegisterCardComponent],
  selector: 'app-registers',
  styleUrl: './registers.component.scss',
  templateUrl: './registers.component.html',
})
export class RegistersComponent implements OnInit {
  router = inject(Router);
  registerService = inject(RegistersService);
  registers = signal<RegisteredTeam[]>([]);

  ngOnInit(){
    this.registerService.getAllTeamsInAllLeagues().subscribe(data=>{
      this.registers.set(data);
    })
  }

  goToMenu(){
    this.router.navigateByUrl('menu');
  }

  goToNewRegister(){
    this.router.navigateByUrl('registers/new')
  }

}

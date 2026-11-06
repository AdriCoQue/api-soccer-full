import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.component.scss',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  router = inject(Router);

  goToLeagues(){
    this.router.navigateByUrl('leagues');
  }

  goToTeams(){
    this.router.navigateByUrl('teams')
  }

  goToRegisters(){
    this.router.navigateByUrl('registers');
  }
}

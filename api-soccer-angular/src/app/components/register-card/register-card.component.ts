import { Component, inject, input } from '@angular/core';
import { RegisteredTeam } from '../../models';
import { RegistersService } from '../../services';

@Component({
  imports: [],
  selector: 'app-register-card',
  styleUrl: './register-card.component.scss',
  templateUrl: './register-card.component.html',
})
export class RegisterCardComponent {
  register = input.required<RegisteredTeam>();
  registerService = inject(RegistersService);

  deleteRegister(){
    this.registerService.disableRegister(this.register().idleague, this.register().idteam).subscribe();
  }
}

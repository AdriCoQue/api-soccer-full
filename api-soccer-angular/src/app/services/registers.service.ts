import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisteredTeam, TeamRegister } from '../models';

@Service()
export class RegistersService {
    private readonly baseUrl = 'https://localhost:7109/api/teamInLeague';
    http = inject(HttpClient);

    getAllTeamsInAllLeagues():Observable<RegisteredTeam[]>{
        return this.http.get<RegisteredTeam[]>(this.baseUrl);
    }

    getTeamsInLeague(idleague: number): Observable<RegisteredTeam[]>{
        return this.http.get<RegisteredTeam[]>(`${this.baseUrl}/league/${idleague}`);
    }

    getLeaguesOfTeam(idteam: number): Observable<RegisteredTeam[]>{
        return this.http.get<RegisteredTeam[]>(`${this.baseUrl}/team/${idteam}`);
    }

    disableRegister(idleague: number, idteam: number){
        return this.http.delete(`${this.baseUrl}/disable/${idleague}/${idteam}`);
    }

    deleteRegister(idleague: number, idteam: number){
        return this.http.delete(`${this.baseUrl}/${idleague}/${idteam}`);
    }

    addRegister(register: TeamRegister){
        return this.http.post(this.baseUrl, register);
    }
}

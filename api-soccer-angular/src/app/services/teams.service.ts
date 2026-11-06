import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { FullTeam, Team } from '../models';
import { Observable } from 'rxjs';

@Service()
export class TeamsService {
    private readonly baseUrl = 'https://localhost:7109/api/team';
    http = inject(HttpClient);

    getAllTeams(): Observable<FullTeam[]>{
        return this.http.get<FullTeam[]>(this.baseUrl);
    }

    getTeam(id: number): Observable<FullTeam>{
        return this.http.get<FullTeam>(`${this.baseUrl}/${id}`)
    }

    addTeam(team: Team): Observable<FullTeam>{
        return this.http.post<FullTeam>(this.baseUrl, team);
    }

    updateTeam(id: number, team: Team){
        return this.http.put(`${this.baseUrl}/${id}`,team)
    }

    disableTeam(id:number){
        return this.http.delete(`${this.baseUrl}/disable/${id}`)
    }

    deleteTeam(id:number){
        return this.http.delete(`${this.baseUrl}/${id}`)
    }

}

import { inject, Service } from '@angular/core';
import { FullLeague, League } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class LeaguesService {
    private readonly baseUrl = 'https://localhost:7109/api/league';
    http = inject(HttpClient);

    getAllLeagues(): Observable<FullLeague[]>{
        return this.http.get<FullLeague[]>(this.baseUrl);
    }

    getLeague(id: number): Observable<FullLeague>{
        return this.http.get<FullLeague>(`${this.baseUrl}/${id}`)
    }

    addLeague(league: League):Observable<FullLeague>{
        return this.http.post<FullLeague>(this.baseUrl, league);
    }

    updateLeague(id: number, league: League){
        return this.http.put(`${this.baseUrl}/${id}`,league)
    }

    disableLeague(id:number){
        return this.http.delete(`${this.baseUrl}/disable/${id}`)
    }

    deleteLeague(id:number){
        return this.http.delete(`${this.baseUrl}/${id}`)
    }
}


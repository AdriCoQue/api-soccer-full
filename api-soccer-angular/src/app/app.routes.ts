import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        loadComponent: () => import('./components/menu/menu.component')
                            .then((m)=> m.MenuComponent)
    },
    {
        path: 'leagues',
        loadComponent: () => import('./components/leagues/leagues.component')
                            .then((m)=>m.LeaguesComponent)
    },
    {
        path: 'teams',
        loadComponent: () => import('./components/teams/teams.component')
                            .then((m)=>m.TeamsComponent)
    },
    {
     path: 'registers',
     loadComponent: () => import('./components/registers/registers.component')
                        .then((m)=>m.RegistersComponent)   
    },
    {
        path: 'leagues/add',
        loadComponent: () => import('./components/add-league/add-league.component')
                            .then((m)=>m.AddLeagueComponent)
    },
    {
        path: 'teams/add',
        loadComponent: () => import('./components/add-team/add-team.component')
                            .then((m)=> m.AddTeamComponent)
    },
    {
        path: 'registers/new',
        loadComponent: () => import('./components/add-register/add-register.component')
                            .then((m)=>m.AddRegisterComponent)
    },
    {
        path: 'teams/edit/:id',
        loadComponent: () => import('./components/edit-team/edit-team.component')
                            .then((m)=>m.EditTeamComponent)
    },
    {
        path: 'leagues/edit/:id',
        loadComponent: () => import ('./components/edit-league/edit-league.component')
                            .then((m)=>m.EditLeagueComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component')
                            .then((m)=>m.NotFoundComponent)
    }
];

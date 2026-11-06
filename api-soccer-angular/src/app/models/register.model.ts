export interface TeamRegister {
    idleague: number;
    idteam: number;
}
export interface RegisteredTeam extends TeamRegister{
    teamName: string;
    leagueName: string;
}
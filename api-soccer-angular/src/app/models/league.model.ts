export interface League{
    name: string;
    country: string;
    startDate: string;
    endDate: string;
}

export interface FullLeague extends League{
    idleague: number;
    teamsRegistered: number;
}

export const EmptyLeague: FullLeague= {
    idleague: 0,
    teamsRegistered: 0,
    name: "",
    country: "",
    startDate: "",
    endDate: ""
}
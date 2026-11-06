export interface Team{
    name: string;
    country: string;
    playersQuantity: number;
}

export interface FullTeam extends Team{
    idteam: number;
}

export const EmptyTeam: FullTeam = {
    idteam: 0,
    name: "",
    country: "",
    playersQuantity: 0
}
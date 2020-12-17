import { v1 as uuid } from 'uuid';
export interface Entry {
    id: string,
    title: string,
    beggining: number,
    end: number
}

export const initialEntries: Entry[] = [
    {
        id: uuid(),
        title: "South",
        beggining: 2,
        end: 3
    },
    {
        id: uuid(),
        title: "North",
        beggining: 5,
        end: 6
    },
    {
        id: uuid(),
        title: "South East",
        beggining: 6,
        end: 7
    },
]
export interface ICard {
    activity: string;
    type: string;
    participants: number;
    accessibility: number | string;
    price: number | string;
    key: number;
}

export interface IHeader {
    headerTags: string[],
}
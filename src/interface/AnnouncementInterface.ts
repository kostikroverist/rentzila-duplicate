
export interface Announcement {
    id?: string;
    img: string;
    title: string;
    description: string;
    price: number;
    location: number[];
    town: string | undefined;
    region: string | undefined
}
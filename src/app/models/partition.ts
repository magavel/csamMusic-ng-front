export interface Partition {
    _id?: string;
    title: string,
    subTitle: string,
    images: [string],
    description: string,
    composeur?: string,
    pays:string,
    genre: string,
    instruments: [string],
    tonalite: string,
    partitionFile: string,
    abc: string,
    midi: string
}

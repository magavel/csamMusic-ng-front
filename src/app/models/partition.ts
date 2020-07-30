export interface Partition {
    id?: string;
    title: string,
    subTitle: string,
    text:string,
    images: [string],
    description: string,
    composeur?: string,
    pays: { name: string, flag: string },
    genre: {name: string },
    instruments: [string],
    tonalites: {name:string},
    partitionFile: string,
    abc: string,
    midi: string,
    playlists: [string],
}

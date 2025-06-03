export type SongType = {
    songId: string,
    songName: string,
    songDescription: string,
    songOrder: string,
    songKey: string,
    songReference: string,
    totalVocalist: string,
    totalGuitarist: string,
    totalDrummer: string,
    totalBassist: string,
    totalKeyboardist: string,
    totalExtra: string,
    totalPercussionist: string
}

export type SongListType = Pick<Song, 'songId' | 'songName' | 'songKey' | 'songOrder'> & { isAssigned: string}

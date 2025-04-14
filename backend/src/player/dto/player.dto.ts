export enum PlayerType {
    VOCALIST = 'vocalist',
    GUITARIST = 'guitarist',
    BASSIST = 'bassist',
    DRUMMER = 'drummer',
    KEYBOARDIST = 'Keyboardist',
    EXTRA = 'extra',
    PERCUSSIONIST = 'percussionist'
}

export class PlayerDto {
    playerType: PlayerType;
    playerId?: string[];
    songId?: string;
}


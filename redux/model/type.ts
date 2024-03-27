export type modelStatus = {
    status: modelStatusType;
    drawer: boolean;
    data: any;
}

export type modelStatusType =
    'close' |
    'signIn' |
    'signUp' |
    'forget-password' |
    'leader-board' |
    'game-start' |
    'game-end';
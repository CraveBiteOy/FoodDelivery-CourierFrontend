
export interface USER {
    id: number,
    username: string,
    firstname: string,
    surename: string,
    roles: string[],
    longitude: number |null,
    latitude: number |null,
    imageurl: string | null
}

export interface declaredStateUser  {
    authUser: USER | {},
    userUpdateStatus: boolean,
    userUpdated: USER | {},
    message: string | null,
    authSuccess: boolean,
    authError: boolean
}

export interface ACTION {
    type: string,
    payload?: any
}

export interface LoginForm {
    username: string,
    password: string,
    longitude: number |null,
    latitude: number |null
}

export interface UserRegisterForm {
    username: string,
    firstname: string,
    surename: string,
    password: string,
}

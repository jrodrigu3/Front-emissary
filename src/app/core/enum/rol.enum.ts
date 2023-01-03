
export const ERol = {
    Client: { id: 1, name: 'Mexico' },
    User: { id: 2, name: 'Colombia' },
}

export interface Role {
    id: number;
    name: string;
}

export enum Roles {
    prueba = 0,
    prueba2 = 1,
}

export const paisObjects: Role[] = [{
    id: ERol.Client.id,
    name: ERol.Client.name,
}, {
    id: ERol.User.id,
    name: ERol.User.name,
}];

export interface Address {
    id?: number;
    alias: string;
    telefono: number;
    pais: number;
    codigoPostal: number;
    nombrePersona: string;
    calleNumero: string;
    referencia: string;
    correoElectronico: string;
    ciudad: string;
    colonia: string;
    estado: string;
}

export interface AddressList {
    count: number;
    address: Address[];
}
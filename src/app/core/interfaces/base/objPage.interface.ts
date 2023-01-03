export interface ObjPage {
    sizeTable: number;
    count: number;
    pageNumber: number;
    param: string;
}

export const pageDefault: ObjPage = {
    sizeTable: 5,
    count: 0,
    pageNumber: 0,
    param: ''
}
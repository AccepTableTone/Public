export interface Employee {
    id: number | undefined;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses?: Address[];
}

export interface Address {
    streetName:string;
    postalCode: string;
    apartmentNumber: number | undefined;
    state: string;
    country: string;
}

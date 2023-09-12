export interface Employee {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: Address[];
}

export interface Address {
    streetName: string;
    postalCode: string;
    apartmentNumber?: number | string | null | undefined;
    state: string;
    country: string;
}

export interface HookFormProps {
    name: string;
    control: any;
    label: string;
    fullWidth: boolean;
}

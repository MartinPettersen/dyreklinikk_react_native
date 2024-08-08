export interface Clinic {
    name: string,
    id: string,
    adress: string,
    openingHour: string,
    closingHour: string,
    employees: any[]
}

export type RootStackParamList = {
    AdminClinic: { clinic: Clinic };
    AddEmployee: { clinic: Clinic };
    AddPet: { ownerId: string };
}

export type Pet = {
    name: string,
    owner: string,
    species: string,
    race: string,
    treatments: any[]
}
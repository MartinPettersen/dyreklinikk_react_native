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
    AddPatient: { patients: any[] };
    PetInfo: { pet: any };
    AdminEmployee: { employee: any };
    AdminDeletePatient: { deleteRequest: any };
    Clinic: { clinic: Clinic };
    VetPatientInfo: { owner: any, patient: any, user: any };
    Booking: { clinic: Clinic, vet: any, date: string, time: any };
    VetTreatment: { treatment: any };
    VetClinic: { clinic: Clinic };
    Coworker: { employee: any };

}

export type Pet = {
    name: string,
    owner: string,
    species: string,
    race: string,
    treatments: any[]
}

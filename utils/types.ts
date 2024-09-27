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
    PetInfo: { pet: Pet };
    AdminEmployee: { employee: any };
    AdminEmployees: undefined;
    AdminDeletePatient: { deleteRequest: any };
    AdminDeletePatients: undefined;
    AddClinic: undefined;
    AdminClinics: undefined;
    Clinic: { clinic: Clinic };
    Clinics: undefined;
    Start: undefined;
    Admin: undefined;
    SignUp: undefined;
    Login: undefined;
    MyPage: undefined;
    PatientTreatments: any;
    AddOwnerInfo: undefined;
    VetTreatments: undefined;
    VetMyPage: undefined;
    VetPatientInfo: { owner: any, patient: any, user: any };
    CoworkerPatientInfo: { owner: any, patient: any, user: any };
    Booking: { clinic: Clinic, vet: any, date: string, time: any };
    VetTreatment: { treatment: any };
    VetClinic: { clinic: Clinic };
    Coworker: { employee: any };
    VetClinics: undefined;
    MyPatients: undefined;
}

export type Pet = {
    name: string,
    owner: string,
    species: string,
    race: string,
    treatments: string[]
}

export type Role = {
    email: string,
    role: string
}

export type Treatments = {
    clinicId: string,
    date: string
    note: string,
    owner: string,
    pet: number,
    reason: string,
    status: string,
    time: string,
    vetId: string
}

export type Owner = {
    adress: string,
    email: string,
    name: string,
    pets: Pet[],
    phone: string,
}

export type Vet = {
    birthday: string,
    email: string,
    expertise: string,
    hiringDay: string,
    information: string,
    name: string
    patients: VetPatients[]
    phone: string,
    title: string,
    workplace: string,
}

export type VetPatients = {
    ownerId: string,
    patient: string,
}
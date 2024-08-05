export interface Clinic {
    name: string,
    id: string,
}

export type RootStackParamList = {
    AdminClinic: { clinic: Clinic };
}
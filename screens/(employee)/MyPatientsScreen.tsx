import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUser } from "../../components/(user)/UserContext";
import MyPatientsPage from '../../components/(employee)/MyPatientsPage';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Vet, VetPatients } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyPatients'>;
};



const MyPatientsScreen = ({navigation }: Props) => {
    const { user } = useUser();

    const [patients, setPatients] = useState<VetPatients[] | null>([])

    const getPatients = () => {
      const docRef = collection(FIRESTORE_DB, "employees");
      const subscriber = onSnapshot(
        query(docRef, where("email", "==", user!.email)),
        {
          next: (snapshot) => {
            let patientsList: VetPatients[] = [];
            snapshot.docs.forEach((doc) => {
              patientsList = doc.data().patients
            })
            setPatients(patientsList)
          }
        }
      )

    }

    useEffect(() => {
      getPatients()
    },[])

  return (
    <MyPatientsPage navigation={navigation} user={user} patients={patients}/>
  )
}

export default MyPatientsScreen
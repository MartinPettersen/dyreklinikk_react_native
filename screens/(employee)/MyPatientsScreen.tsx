import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUser } from "../../components/(user)/UserContext";
import MyPatientsPage from '../../components/(employee)/MyPatientsPage';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const MyPatientsScreen = ({navigation }: any) => {
    const { user } = useUser();

    const [patients, setPatients] = useState<any[] | null>([])

    const getPatients = () => {
      const docRef = collection(FIRESTORE_DB, "employees");
      const subscriber = onSnapshot(
        query(docRef, where("email", "==", user!.email)),
        {
          next: (snapshot) => {
            let patientsList: any[] = [];
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
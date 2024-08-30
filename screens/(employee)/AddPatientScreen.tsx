import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import AddPatientPage from '../../components/(employee)/AddPatientPage'
import { useUser } from "../../components/(user)/UserContext";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const AddPatientScreen = ({navigation, route}: any) => {
  const { user } = useUser();

  const {patients} = route.params

  const [vetInfo, setVetInfo] = useState<any | null>(null);

  const getVetInfo = () => {
    const docRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(docRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          let vetInfoList: any[] = [];
          snapshot.docs.forEach((doc) => {
            vetInfoList.push({vetId: doc.id, clinicId: doc.data().workplace});
          });
          setVetInfo(vetInfoList[0]);
        },
      }
    );
  };

  useEffect(() => {
    getVetInfo();
  }, []);

  return (
    <AddPatientPage navigation={navigation} patients={patients} vetInfo={vetInfo}/>
  )
}

export default AddPatientScreen
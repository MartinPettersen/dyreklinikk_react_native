import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import AddPatientPage from '../../components/(employee)/AddPatientPage'
import { useUser } from "../../components/(user)/UserContext";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type VetInfo = {
  clinicId: string, 
  vetId: string
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPatient'>;
  route: RouteProp<RootStackParamList, 'AddPatient'>;
};

const AddPatientScreen = ({navigation, route}: Props) => {
  const { user } = useUser();

  const {patients} = route.params

  const [vetInfo, setVetInfo] = useState<VetInfo | null>(null);

  const getVetInfo = () => {
    const docRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(docRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          let vetInfoList: VetInfo[] = [];
          snapshot.docs.forEach((doc) => {
            vetInfoList.push({vetId: doc.id, clinicId: doc.data().workplace});
          });
          console.log("vetInfoList[0]", vetInfoList[0])
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
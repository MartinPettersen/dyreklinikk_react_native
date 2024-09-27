import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import VetTreatmentPage from "../../components/(employee)/VetTreatmentPage";
import { useUser } from "../../components/(user)/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type VetTreatmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VetTreatment'>;
  route: RouteProp<RootStackParamList, 'VetTreatment'>;
};

const VetTreatmentScreen: React.FC<VetTreatmentScreenProps> = ({navigation, route}) =>  {
  const { treatment } = route.params;

  const { user } = useUser();

  const [clinicId, setClinicId] = useState<string | null>(null);

  const getVetInfo = () => {
    const docRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(docRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          let vetInfoList: string[] = [];
          snapshot.docs.forEach((doc) => {
            vetInfoList.push(doc.data().workplace);
          });
          setClinicId(vetInfoList[0]);
        },
      }
    );
  };



  return (
    <VetTreatmentPage patientTreatment={treatment} navigation={navigation} clinicId={clinicId}/>
  );
};


export default VetTreatmentScreen;

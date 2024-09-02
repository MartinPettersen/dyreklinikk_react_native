import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import VetTreatmentPage from "../../components/(employee)/VetTreatmentPage";
import { useUser } from "../../components/(user)/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const VetTreatmentScreen = ({ navigation, route }: any) => {
  const { treatment } = route.params;

  const { user } = useUser();

  const [clinicId, setClinicId] = useState<any | null>(null);

  const getVetInfo = () => {
    const docRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(docRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          let vetInfoList: any[] = [];
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

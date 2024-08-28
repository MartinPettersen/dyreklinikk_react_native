import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import VetTreatmentPage from "../../components/(employee)/VetTreatmentPage";

const VetTreatmentScreen = ({ navigation, route }: any) => {
  const { treatment } = route.params;
  return (
    <VetTreatmentPage patientTreatment={treatment} navigation={navigation}/>
  );
};


export default VetTreatmentScreen;

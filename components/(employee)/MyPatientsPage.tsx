import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BasicButton from "../(util)/BasicButton";
import IconButton from "../(util)/IconButton";
import AddPetButton from "../(util)/AddPetButton";
import { FIRESTORE_DB } from "../../firebaseConfig";
import PatientDisplay from "./PatientDisplay";

type Props = {
  navigation: any;
  user: any;
  patients: any;
};

type RenderPatientProp = {
  item: any;
}


const MyPatientsPage = ({ navigation, user, patients }: Props) => {


  const renderPatient = ({ item }: RenderPatientProp) => {
    return <PatientDisplay patient={item} navigation={navigation} user={user}/>
  }


  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Mine Pasienter</Text>
      <AddPetButton
        label={"patient"}
        action={() => navigation.navigate("AddPatient", {patients: patients})}
        disabled={false}
      />
      {patients.length > 0 ? (
        <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={(patient: any, index: number) => `${patient.patient}${patient.ownerId}${index}`}
        />
      ): null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default MyPatientsPage;

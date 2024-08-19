import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import TreatmentInfoDisplay from "../(patient)/TreatmentInfoDisplay";
import PatientTreatmentDisplay from "./PatientTreatmentDisplay";

type Props = {
  navigation: any;
  owner: any;
  patient: any;
};


type RenderTreatmentProp = {
  item: any;
};


const PatientInfoPage = ({ navigation, owner, patient }: Props) => {
  console.log("owner", owner.pets);
  console.log("patient", patient.patient);
  //console.log("owner.pets[patient.patient].treatments?.length ", owner.pets[patient.patient].treatments?.length)

  const renderTreatment = ({ item }: RenderTreatmentProp) => {
    console.log(item)
    return (
      <PatientTreatmentDisplay
        navigation={navigation}
        treatmentId={item}
        key={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Pasient: </Text>{" "}
          {owner.pets[patient.patient].name}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Art: </Text>{" "}
          {owner.pets[patient.patient].species}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Rase: </Text>{" "}
          {owner.pets[patient.patient].race}
        </Text>
        <Text style={[styles.headline]}>Behandlinger</Text>

        {owner && owner.pets[patient.patient].treatments?.length > 0 ? (
          
        <FlatList
          data={owner.pets[patient.patient].treatments}
          renderItem={renderTreatment}
          keyExtractor={(treatment: any) => treatment}
        />
      ) : null}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#52525b",
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  employeesContainer: {
    margin: 0,
  },
  headline: {
    fontSize: 26,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default PatientInfoPage;

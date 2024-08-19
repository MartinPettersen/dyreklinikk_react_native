import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  patient: any;
  navigation: any
};

const PatientDisplay = ({ patient, navigation }: Props) => {
  const [owner, setOwner] = useState<any | null>(null);

  const getPatients = async () => {
    const docRef = doc(FIRESTORE_DB, `owners/${patient.ownerId}`);

    const subscriber = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setOwner(snapshot.data());
      } else {
        console.log("Problem with fetching documents");
        setOwner(null);
      }
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("VetPatientInfo", { owner: owner, patient: patient })} disabled={owner == undefined || patient == undefined}>
      {owner ? (
        <>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Pasient:</Text>{" "}
            {owner.pets[patient.patient].name}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Eier:</Text>{" "}
            {owner.name}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Behandlinger:</Text>{" "}
            {owner.pets[patient.patient].treatments.length}
          
          </Text>
        </>
      ) : (
        <Text>Problemer med å finne Pasient</Text>
      )}
    </TouchableOpacity>
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
  container: {
    backgroundColor: "#7dd3fc",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#52525b",
    marginTop: 20,
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
});

export default PatientDisplay;

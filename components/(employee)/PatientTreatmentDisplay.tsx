import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { View, StyleSheet, Text } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  treatmentId: string;
};

const PatientTreatmentDisplay = ({ navigation, treatmentId }: Props) => {
  const [treatment, setTreatment] = useState<any | null>(null);
  const getTreatment = async () => {
    const docRef = doc(FIRESTORE_DB, `treatments/${treatmentId}`);

    const subscriber = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setTreatment(snapshot.data());
      } else {
        console.log("Problemer med å hente dokumentet");
        setTreatment(null);
      }
    });
  };

  useEffect(() => {
    getTreatment();
  }, []);

  return (
    <View style={[styles.container, styles.shadow]}>
      {treatment ? (
        <>
          <Text style={[styles.text, styles.bold]}>Behandling</Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Dato:</Text>{" "}
            {treatment.date}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Grunn for besøket:</Text>{" "}
            {treatment.reason}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Status:</Text>{" "}
            {treatment.status === "waiting"
              ? "Venter på godkjennelse"
              : "Godkjent"}
          </Text>
        </>
      ) : (
        <Text>Problemer med å finne Behandlingen</Text>
      )}
    </View>
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

export default PatientTreatmentDisplay;

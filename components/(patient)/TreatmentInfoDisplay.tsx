import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

type Props = {
  treatmentId: any;
  navigation: any;
  owner: any;
};

const TreatmentInfoDisplay = ({ treatmentId, navigation, owner }: Props) => {
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
    <View>
      {treatment && owner ? (
      <View
        style={[
          styles.container,
          styles.shadow,
          {
            backgroundColor:
              treatment.status === "waiting" ? "#d4d4d8" : "#7dd3fc",
          },
        ]}
      >
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
              <Text style={[styles.text, styles.bold]}>Dyr:</Text>{" "}
              {owner.owner.pets[treatment.pet].name}
            </Text>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.bold]}>Status:</Text>{" "}
              {treatment.status === "waiting"
                ? "Venter på godkjennelse"
                : "Godkjent"}
            </Text>
          </>
      </View>
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

export default TreatmentInfoDisplay;

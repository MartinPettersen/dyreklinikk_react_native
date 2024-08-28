import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import BasicButton from "../(util)/BasicButton";

type Props = {
  patientTreatment: any;
  navigation: any;
};

const VetTreatmentPage = ({ patientTreatment, navigation }: Props) => {
  const [treatment, setTreatment] = useState(patientTreatment);
  const [updated, setUpdated] = useState(false);
  const [noteActive, setNoteActive] = useState(false);
  const [note, setNote] = useState(patientTreatment.note);

  const updateTreatment = async () => {
    const docRef = doc(FIRESTORE_DB, `treatments/${treatment.id}`);
    updateDoc(docRef, {
      status: "accepted",
    });

    treatment.status = "accepted";
    setTreatment(treatment);
    setUpdated(!updated);
  };

  const addNote = async () => {
    const docRef = doc(FIRESTORE_DB, `treatments/${treatment.id}`);
    updateDoc(docRef, {
      note: note,
    });
    setNoteActive(false);
    setUpdated(!updated);
  };

  const deleteTreatment = async () => {
    const docRef = doc(FIRESTORE_DB, `treatments/${treatment.id}`);
    deleteDoc(docRef);
    navigation.navigate("VetTreatments");
  };

  useEffect(() => {}, [updated]);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Behandling</Text>
      <View>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Sted:</Text>{" "}
        </Text>

        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Tid:</Text> {treatment.date}{" "}
          klokken {treatment.time}
        </Text>

        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Behandling:</Text>{" "}
          {treatment.reason}
        </Text>

        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Eier:</Text>{" "}
          {treatment.owner}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Pasient:</Text>{" "}
          {treatment.pet}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Status:</Text>{" "}
          {treatment.status}
        </Text>
        {noteActive ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Kommentar"
              onChangeText={(text: string) => setNote(text)}
              value={note}
              style={styles.inputField}
            />
            <BasicButton
              label="Legg til"
              disabled={note == ""}
              action={() => addNote()}
            />
          </View>
        ) : (
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Notat:</Text> {note}
          </Text>
        )}
      </View>
      <View style={styles.buttonView}>
        <BasicButton
          label="Godta Time"
          action={() => updateTreatment()}
          disabled={false}
        />
      </View>
      <View style={styles.buttonView}>
        <BasicButton
          label="Legg til kommentar"
          action={() => setNoteActive(!noteActive)}
          disabled={false}
        />
      </View>
      <View style={styles.buttonView}>
        <BasicButton
          label="Fjern Time"
          action={() => deleteTreatment()}
          disabled={false}
        />
      </View>
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
  button: {
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  buttonView: {
    marginTop: 30,
    width: "60%",
  },
  inputField: {
    padding: 10,
    paddingBottom: 2,
    paddingTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    backgroundColor: "white",
    width: "60%",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
  },
});

export default VetTreatmentPage;

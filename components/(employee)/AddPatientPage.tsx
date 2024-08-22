import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import VetOwnerDropDown from "./VetOwnerDropDown";

type Props = {
  navigation: any;
  patients: any[];
};

type Owner = {
  name: string;
  email: string;
  phone: string;
  adress: string;
};

type Treatment = {
  patient: string;
  meetUp: boolean;
  date: string;
};

const AddPatientPage = ({ navigation, patients }: Props) => {
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string | null>(null);
  const [race, setRace] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [treatments, setTreatments] = useState<any[] | null>();

  const addPet = async () => {
    console.log("owner",owner)
    const docRef = doc(FIRESTORE_DB, `owners/${owner}`);
    console.log("docref",docRef)
    const test = updateDoc(docRef, {
      pets: arrayUnion({
        name: name,
        owner: owner,
        species: species,
        race: race,
        treatments: treatments || [],
      }),
    });

    console.log("test",test)
    navigation.navigate("MyPatients")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Nytt Kjeledyr</Text>
      <VetOwnerDropDown
        patients={patients}
        open={open}
        setOpen={setOpen}
        selectedOwner={owner}
        setSelectedOwner={setOwner}
      />
      <TextInput
        placeholder="Navn på Dyret"
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Art"
        onChangeText={(text: string) => setSpecies(text)}
        value={species}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Rase"
        onChangeText={(text: string) => setRace(text)}
        value={race}
        style={styles.inputField}
      />
      <View style={{ width: "60%", paddingTop: 10, zIndex: 1 }}>
        <BasicButton
          label={"Legg Til"}
          action={() => addPet()}
          disabled={name === ""}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default AddPatientPage;

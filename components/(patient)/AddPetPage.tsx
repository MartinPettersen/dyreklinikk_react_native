import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, KeyboardAvoidingView } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import BasicButton from "../(util)/BasicButton";

type Props = {
  navigation: any;
  ownerId: string;
};

const AddPetPage = ({ navigation, ownerId }: Props) => {
  const [name, setName] = useState<string>("");
  const [owner, setOwner] = useState<string | null>(ownerId);
  const [species, setSpecies] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [treatments, setTreatments] = useState<any[] | null>([]);

  const addPet = async () => {
    const docRef = doc(FIRESTORE_DB, `owners/${ownerId}`);
    

    
    updateDoc(docRef, {
      pets: arrayUnion({
          name: name,
          owner: owner,
          species: species,
          race: race,
          treatments: treatments,
        }),
    });
    navigation.navigate("MyPage");
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} enabled style={styles.container}>


      <Text style={styles.headline}>Nytt Kjeledyr</Text>
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
          </KeyboardAvoidingView>
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
export default AddPetPage;

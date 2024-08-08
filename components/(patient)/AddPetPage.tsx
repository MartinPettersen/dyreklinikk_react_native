import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import BasicButton from "../(util)/BasicButton";

type Props = {
  navigation: any;
  user: any;
};

const AddPetPage = ({ navigation, user }: Props) => {
  const [name, setName] = useState<string>("");
  const [owner, setOwner] = useState<string | null>(user.name);
  const [species, setSpecies] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [treatments, setTreatments] = useState<any[] | null>([]);

  const addPet = async () => {
    console.log("user.id", user)
    const docRef = doc(FIRESTORE_DB, `owners/${user.id}`);
    

    
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
    <View style={styles.container}>
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
export default AddPetPage;

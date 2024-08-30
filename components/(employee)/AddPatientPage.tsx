import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import VetOwnerDropDown from "./VetOwnerDropDown";

type Props = {
  navigation: any;
  patients: any[];
  vetInfo: any;
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

const AddPatientPage = ({ navigation, patients, vetInfo }: Props) => {
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string | null>(null);
  const [race, setRace] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [treatments, setTreatments] = useState<any[] | null>();

  const addPatient = async (petIndex: number) => {
        //console.log("test", test);
        console.log("vetInfo", vetInfo)
        const employeeRef = doc(FIRESTORE_DB, `employees/${vetInfo.vetId}`);
        await updateDoc(employeeRef, {
          patients: arrayUnion({ ownerId: owner, patient: petIndex }),
        });
        console.log("her også")
        const clinicRef = doc(FIRESTORE_DB, `clinics/${vetInfo.clinicId}`);
        await updateDoc(clinicRef, {
          patients: arrayUnion({ ownerId: owner, patient: petIndex }),
        });
    
  }


  const addPet = async () => {
    const docRef = doc(FIRESTORE_DB, `owners/${owner}`);
    const thePet = {
      name: name,
      owner: owner,
      species: species,
      race: race,
      treatments: treatments || [],
    }
    const test = updateDoc(docRef, {
      pets: arrayUnion(thePet),
    });

    //console.log("we com hit")
    //console.log("owner", owner)
    const ownerRef = doc(FIRESTORE_DB, `owners/${owner}`);
    //console.log("ownerRef",ownerRef)
    let ownerTemp;
    let petIndex;

    const subscriber = onSnapshot(ownerRef, (snapshot) => {
      //console.log("snapshot.data()",snapshot.data())
      if (snapshot.exists()) {
        //console.log("it exists")
        ownerTemp = snapshot.data();
    
    
        //console.log("ownerTemp", ownerTemp)
        for (let i = 0; i < ownerTemp!.pets.length; i++) {
          //console.log("ownerTemp!.pets[i]",ownerTemp!.pets[i])
          //console.log("thePet", thePet)
          if (ownerTemp!.pets[i].name === thePet.name){
            petIndex = i;
              addPatient(i)

            //console.log("we found the pet")
          } else {
            //console.log("no pet")
          }
        }
    
      } else {
        ownerTemp = null;
      }
    });
    

    navigation.navigate("MyPatients")
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} enabled style={styles.container}>


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

export default AddPatientPage;

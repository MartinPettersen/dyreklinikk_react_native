import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import SmallButton from "../(util)/SmallButton";

type Props = {
  navigation: any;
};

const AddClinicPage = ({ navigation }: Props) => {
  const [name, SetName] = useState<string>();
  const [adress, SetAdress] = useState<string>();
  const [openingHour, setOpeningHour] = useState<number>();
  const [closingHour, setClosingHour] = useState<number>();
  // const [treatment, setTreatment] = useState<string>();
  const [treatments, setTreatments] = useState<string[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [patients, setPatients] = useState<string[]>([]);

  const addClinic = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "clinics"), {
      name: name,
      adress: adress,
    });
    navigation.navigate("Clinics");
  };



  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Legg til ny Klinikk</Text>
      <TextInput
        placeholder="Navn på Klinikken"
        onChangeText={(text: string) => SetName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Adressen til Klinikken"
        onChangeText={(text: string) => SetAdress(text)}
        value={adress}
        style={styles.inputField}
      />
      
      {/* 
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Behandlinger"
          onChangeText={(text: string) => setTreatment(text)}
          value={treatment}
          style={[styles.inputField, { width: "46%" }]}
        />
        <View
          style={{ height: 40, alignItems: "center", justifyContent: "center" }}
        >
          <SmallButton
            label={"Add"}
            action={() => addClinic()}
            disabled={name === ""}
          />
        </View>
      </View>
      */}
      <View style={{ width: "60%" }}>
        <BasicButton
          label={"Legg Til"}
          action={() => addClinic()}
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

export default AddClinicPage;

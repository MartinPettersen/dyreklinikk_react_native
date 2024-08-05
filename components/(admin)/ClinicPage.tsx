import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Clinic } from "../../utils/types";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import DeleteButton from "../(util)/DeleteButton";

type Props = {
  clinic: Clinic;
  navigation: any;
};

const ClinicPage = ({ clinic, navigation }: Props) => {
  const [name, setName] = useState(clinic.name);

  const ref = doc(FIRESTORE_DB, `clinics/${clinic.id}`);
  const updateClinic = async () => {
    updateDoc(ref, { name: name });
  };
  const deleteClinic = async () => {
    deleteDoc(ref)
    navigation.navigate('Clinics')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideButton}>
        <Text>{clinic.name}</Text>
        <TextInput
          placeholder="Navn på Klinikken"
          onChangeText={(text: string) => setName(text)}
          value={name}
          style={styles.inputField}
        />
        <TouchableOpacity style={styles.button}>
          <Feather name="edit" size={25} color={"#52525b"} />
        </TouchableOpacity>
      </View>

      <BasicButton
        label={"Oppdater"}
        action={() => updateClinic()}
        disabled={false}
      />
      <View style={styles.sideButton}>
        <Text>Ansatte</Text>
        <TouchableOpacity style={styles.button}>
          <Feather name="user-plus" size={25} color={"#52525b"} />
        </TouchableOpacity>
      </View>
      <DeleteButton
        label={"Delete"}
        action={() => deleteClinic()}
        disabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sideButton: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
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
});

export default ClinicPage;

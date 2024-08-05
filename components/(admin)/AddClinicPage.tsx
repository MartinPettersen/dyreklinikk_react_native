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

type Props = {
  navigation: any
}

const AddClinicPage = ({navigation}: Props) => {
  const [clinic, SetClinic] = useState<any>();

  const addClinic = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "clinics"), {
      name: clinic,
    });
    navigation.navigate('Clinics')
  };

  return (
    <View style={styles.container}>
      <Text>Legg til ny Klinikk</Text>
      <TextInput
        placeholder="Navn på Klinikken"
        onChangeText={(text: string) => SetClinic(text)}
        value={clinic}
        style={styles.inputField}
      />
      <View style={{ width: "60%" }} >
        <BasicButton label={"Legg Til"} action={() => addClinic()} disabled={clinic === ''}/>
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
  }
});

export default AddClinicPage;

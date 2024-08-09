import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import { Clinic } from "../../utils/types";
import { createUserWithEmailAndPassword } from "firebase/auth";

type Props = {
  navigation: any;
  clinic: Clinic;
};

const AddEmployePage = ({ navigation, clinic }: Props) => {
  const [name, setName] = useState<string>();
  const [workplace, setWorkplace] = useState<string>(clinic.id);
  const [title, setTitle] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [hiringDay, setHiringDay] = useState<string>();
  const [expertise, setExpertise] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [patients, setPatients] = useState<string[]>([]);
  const [information, setInformation] = useState<string>("");

  const auth = FIREBASE_AUTH;

  const addEmployee = async () => {
    const docR = await addDoc(collection(FIRESTORE_DB, "roles"), {
      email: email,
      role: "employee"
    })
    const docRef = await addDoc(collection(FIRESTORE_DB, "employees"), {
      name: name,
      workplace: workplace,
      title: title,
      birthday: birthday,
      hiringDay: hiringDay,
      expertise: expertise,
      email: email,
      phone: phone,
      patients: patients,
      information: information,
    });

    const employeeId = docRef.id;
    navigation.navigate("AdminEmployees");

    const clinicRef = doc(FIRESTORE_DB, `clinics/${clinic.id}`);
    await updateDoc(clinicRef, {
      employeeIds: arrayUnion(employeeId),
    });
  };

  const createEmployeeAccount = async () => {

    try {
        const response = await createUserWithEmailAndPassword(auth, email!, "test123");
    } catch ( error) {
        console.log(error);
    } finally {
      addEmployee()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Ny Ansatt</Text>
      <TextInput
        placeholder="Navn på Ansatte"
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Tittel"
        onChangeText={(text: string) => setTitle(text)}
        value={title}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Fødselsdato"
        onChangeText={(text: string) => setBirthday(text)}
        value={birthday}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Ansettelse Dato"
        onChangeText={(text: string) => setHiringDay(text)}
        value={hiringDay}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Fagfelt"
        onChangeText={(text: string) => setExpertise(text)}
        value={expertise}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Telefon"
        onChangeText={(text: string) => setPhone(text)}
        value={phone}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Ekstra Information"
        onChangeText={(text: string) => setInformation(text)}
        value={information}
        style={styles.inputField}
      />
      <View style={{ width: "60%", paddingTop: 10, zIndex: 1 }}>
        <BasicButton
          label={"Legg Til"}
          action={() => createEmployeeAccount()}
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
  timerText: {
    fontSize: 20,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  dropdownContainer: {
    width: "30%",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEmployePage;

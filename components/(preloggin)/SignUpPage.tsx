import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  navigation: any;
};

const SignUpPage = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState<string>();
  const [adress, setAdress] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [pets, setPets] = useState<string[]>([])

  const auth = FIREBASE_AUTH;

  const addAccount = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "roles"), {
      email: email,
      role: "patient"
    })
    const docRef = await addDoc(collection(FIRESTORE_DB, "owners"), {
      name: name,
      adress: adress,
      email: email,
      phone: phone,
      pets: pets,
    })
  }



  const signUp = async () => {

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch ( error) {
        console.log(error);
    } finally {
      addAccount()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Opprett Konto</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        style={styles.inputField}
      />
      <TextInput
        placeholder="Navn"
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Adresse"
        onChangeText={(text: string) => setAdress(text)}
        value={adress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Telefon"
        onChangeText={(text: string) => setPhone(text)}
        value={phone}
        style={styles.inputField}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Passord"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        autoCapitalize="none"
        style={styles.inputField}
      />
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Opprett"
          action={() => signUp()}
          disabled={false}
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
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
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
  buttonContainer: {
    margin: 10,
    width: "50%",
  },
});
export default SignUpPage;

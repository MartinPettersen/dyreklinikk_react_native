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
  const auth = FIREBASE_AUTH;

  const addAccount = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "roles"), {
      email: email,
      role: "admin"
    })
  }



  const signUp = async () => {

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        //console.log(response)
    } catch ( error) {
        console.log(error);
    } finally {
      // navigation.navigate("Login")
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

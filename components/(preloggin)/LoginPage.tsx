import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation: any;
};

const LoginPage = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    } finally {
      //navigation.navigate("PatientStart")
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} enabled style={styles.container}>
      <Text style={styles.headline}>Login</Text>
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
        <BasicButton label="login" action={() => signIn()} disabled={false} />
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
export default LoginPage;

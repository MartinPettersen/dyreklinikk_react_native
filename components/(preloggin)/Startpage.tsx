import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicButton from "../(util)/BasicButton";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};
const name = "Best Dog Dyreklinikk";

const Startpage = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Velkommen til {name}</Text>

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Våre Klinikker"
          action={() => navigation.navigate("Clinics")}
          disabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Login"
          action={() => navigation.navigate("Login")}
          disabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Ny bruker"
          action={() => navigation.navigate("SignUp")}
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
  buttonContainer: {
    margin: 10,
    width: "50%",
  },
});

export default Startpage;

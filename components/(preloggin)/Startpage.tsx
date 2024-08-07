import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicButton from "../(util)/BasicButton";

const name = "Best Dog Dyreklinikk";

type Props = {
  navigation: any;
};

const Startpage = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Velkommen til {name}</Text>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Ledige Timer"
          action={() => console.log("ledige timer")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Våre Klinikker"
          action={() => console.log("se våre klinikker")}
          disabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Login"
          action={() => console.log("Login")}
          disabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BasicButton
          label="Ny brukker"
          action={() => console.log("ny brukker")}
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

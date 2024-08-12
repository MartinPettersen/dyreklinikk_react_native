import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";

const EmployeeStartScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Logget in som: </Text>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Min Side"
          action={() => console.log("Min Side")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Mine Pasienter"
          action={() => navigation.navigate("MyPatients")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Kommende Behandlinger"
          action={() => console.log("Kommende Behandlinger")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Kollegaer"
          action={() => console.log("Kollegaer")}
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

export default EmployeeStartScreen;

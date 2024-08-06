import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";

const AdminScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <BasicButton
          label={"Klinikker"}
          action={() => navigation.navigate("Clinics")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label={"Ansatte"}
          action={() => navigation.navigate("AdminEmployees")}
          disabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BasicButton
          label={"Pasienter"}
          action={() => navigation.navigate("Clinics")}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 10,
    width: "40%",
  },
});

export default AdminScreen;

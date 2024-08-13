import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicButton from "../(util)/BasicButton";
import IconButton from "../(util)/IconButton";
import AddPetButton from "../(util)/AddPetButton";

type Props = {
  navigation: any;
  user: any;
  patients: any;
};

const MyPatientsPage = ({ navigation, user, patients }: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Mine Pasienter</Text>
      <AddPetButton
        label={"github"}
        action={() => navigation.navigate("AddPatient")}
        disabled={false}
      />
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
});

export default MyPatientsPage;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  pet: any;
};

const PetInfoPage = ({ pet }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{pet.name}</Text>
      <Text style={styles.text}>
        <Text style={[styles.text, styles.bold]}>Art:</Text> {pet.race}
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.text, styles.bold]}>Rase:</Text> {pet.species}
      </Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default PetInfoPage;

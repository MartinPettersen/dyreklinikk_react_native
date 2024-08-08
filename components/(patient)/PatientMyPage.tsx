import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  navigation: any;
};

const PatientMyPage = ({navigation}: Props) => {

    
  return (
    <View style={styles.container}>
      <Text>PatientMyPage</Text>
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
  

export default PatientMyPage;

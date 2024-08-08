import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useUser } from "../../components/(user)/UserContext";

const PatientStartScreen = ({ navigation }: any) => {
  
  const { user } = useUser();
  console.log("user",user)

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Velkommen </Text>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Min Side"
          action={() => console.log("Min Side")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Vetrinærer"
          action={() => console.log("Vetrinærer")}
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
          label="Logg Ut"
          action={() => handleLogout()}
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

export default PatientStartScreen;

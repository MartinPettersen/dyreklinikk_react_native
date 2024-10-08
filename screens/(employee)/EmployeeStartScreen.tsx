import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Vet } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
};

const EmployeeStartScreen = ({ navigation }: Props) => {

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
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Min Side"
          action={() => navigation.navigate("VetMyPage")}
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
          action={() => navigation.navigate("VetTreatments")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Klinikker"
          action={() => navigation.navigate("VetClinics")}
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

export default EmployeeStartScreen;

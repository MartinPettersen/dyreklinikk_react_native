import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Admin'>;
};

const AdminScreen = ({ navigation }: Props) => {
  
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
          label={"Slette Pasienter"}
          action={() => navigation.navigate("AdminDeletePatients")}
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 10,
    width: "40%",
  },
});

export default AdminScreen;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useUser } from "../../components/(user)/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type PatientStartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};


const PatientStartScreen = ({ navigation }: PatientStartScreenProps) => {
  
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Velkommen </Text>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Min Side"
          action={() => navigation.navigate("MyPage")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Våre Klinikker"
          action={() => navigation.navigate("Clinics")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Behandlinger"
          action={() => navigation.navigate("PatientTreatments")}
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
    </SafeAreaView>
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

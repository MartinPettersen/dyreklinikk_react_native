import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Clinic } from "../../utils/types";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import ClinicTag from "../(util)/ClinicTag";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

type RenderClinicProp = {
  item: Clinic;
};

const ClinicsPage = ({ navigation }: Props) => {
  const [clinics, setClinics] = useState<any[] | null>(null);

  useEffect(() => {
    const clinicsRef = collection(FIRESTORE_DB, "clinics");

    const subscriber = onSnapshot(clinicsRef, {
      next: (snapshot) => {
        const clinicsList: Clinic[] = [];
        snapshot.docs.forEach((doc) => {
          clinicsList.push({
            id: doc.id,
            ...doc.data(),
          } as Clinic);
        });
        setClinics(clinicsList);
      },
    });
    return () => subscriber();
  }, []);


  const renderClinic = ({ item }: RenderClinicProp ) => {
    return <ClinicTag clinic={item} action={() => navigation.navigate("Clinic", {clinic: item})}/>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Klinikker</Text>
      {clinics ? (
        <View style={styles.clinicsContainer}>
          {
            <FlatList
              data={clinics}
              renderItem={renderClinic}
              keyExtractor={(clinic: Clinic) => clinic.id}
            />
          }
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
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
  clinicsContainer: {
    margin: 0,
  },
});

export default ClinicsPage;

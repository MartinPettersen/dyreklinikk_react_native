import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import ClinicTag from "./ClinicTag";
import { Clinic } from "../../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalLine from "../(util)/HorizontalLine";

type Props = {
  navigation: any;
};

type RenderClinicProp = {
  item: Clinic
}

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
        console.log(clinicsList);
        setClinics(clinicsList);
      },
    });
    return () => subscriber();
  }, []);

  const renderClinic = ({item }: RenderClinicProp) => {
    return <ClinicTag label={item.name} action={() => navigation.navigate("AdminClinic", {clinic: item})} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Klinikker</Text>
      <BasicButton
        label={"Ny Klinikk"}
        action={() => navigation.navigate("AddClinic")}
        disabled={false}
      />
        <HorizontalLine />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  clinicsContainer: {
    margin: 0,


  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default ClinicsPage;

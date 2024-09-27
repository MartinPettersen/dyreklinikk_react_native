import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useUser } from "../../components/(user)/UserContext";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import TreatmentInfoDisplay from "../../components/(patient)/TreatmentInfoDisplay";
import { Owner, Pet, Treatments } from "../../utils/types";

import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";

type RenderTreatmentProp = {
  item: string;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const PatientTreatmentsScreen = ({ navigation }: Props) => {
  const { user } = useUser();
  const [treatments, setTreatments] = useState<string[]>([]);
  const [owner, setOwner] = useState<Owner | null>(null);

  const getTreatments = () => {
    const ownerRef = collection(FIRESTORE_DB, "owners");

    const subscriber = onSnapshot(
      query(ownerRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const petsList: Pet[] = [];
          const owners: Owner[] = [];
          snapshot.docs.forEach((doc) => {
            petsList.push(
              ...doc.data().pets,
            );
          });
          snapshot.docs.forEach((doc) => {
            const ownerData = doc.data() as Owner;
            owners.push(
              ownerData
            );
          });

          let list: string[] = [];
          for (let i = 0; i < petsList.length; i++) {
            const petTreatments = petsList[i].treatments || [];
            const petName = petsList[i].name;
            list = [...list, ...petTreatments];
          }
          setTreatments(list);
          setOwner(owners[0]);
        },
      }
    );
  };

  useEffect(() => {
    getTreatments();
  }, []);

  const renderTreatment = ({ item }: RenderTreatmentProp) => {
    return (
      <TreatmentInfoDisplay
        navigation={navigation}
        treatmentId={item}
        key={item}
        owner={owner}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {treatments?.length > 0 ? (
        <>
          <Text>Behandlinger {treatments.length}</Text>
          <FlatList
            data={treatments}
            renderItem={renderTreatment}
            keyExtractor={(treatment: string) => treatment}
          />
        </>
      ) : (
        <Text>Det er ingen kommende Behandlinger</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PatientTreatmentsScreen;

import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useUser } from "../../components/(user)/UserContext";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import TreatmentInfoDisplay from "../../components/(patient)/TreatmentInfoDisplay";

type RenderTreatmentProp = {
  item: any;
};

type Props = {
  navigation: any;
};

const PatientTreatmentsScreen = ({ navigation }: Props) => {
  const { user } = useUser();
  const [treatments, setTreatments] = useState<any[]>([]);
  const [owner, setOwner] = useState<any | null>(null);

  const getTreatments = () => {
    const ownerRef = collection(FIRESTORE_DB, "owners");

    const subscriber = onSnapshot(
      query(ownerRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const petsList: any[] = [];
          const owners: any[] = [];
          snapshot.docs.forEach((doc) => {
            petsList.push({
              pets: doc.data().pets,
            });
          });
          snapshot.docs.forEach((doc) => {
            owners.push({
              owner: doc.data(),
            });
          });
          console.log("petlist", petsList[0].pets.length);
          let list: any[] = [];
          for (let i = 0; i < petsList[0].pets.length; i++) {
            const petTreatments = petsList[0].pets[i].treatments || [];
            const petName = petsList[0].pets[i].name;
            console.log("petTreatments", petTreatments);
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
      <Text>Behandlinger {treatments.length}</Text>
      {treatments?.length > 0 ? (
        <FlatList
          data={treatments}
          renderItem={renderTreatment}
          keyExtractor={(treatment: any) => treatment}
        />
      ) : null}
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

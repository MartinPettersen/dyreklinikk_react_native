import React, { useEffect, useState } from "react";
import { useUser } from "../../components/(user)/UserContext";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";

type Props = {
  navigation: any;
};

type RenderTreatmentProp = {
  item: any;
};

const VetTreatmentsScreen = ({ navigation }: Props) => {
  const { user } = useUser();
  const [treatments, setTreatments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);


  const getTreatments = () => {
    const vetRef = collection(FIRESTORE_DB, "employees");

    const subscriber = onSnapshot(
      query(vetRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const patientsList: any[] = [];
          const treatmentsList: any[] = [];
          snapshot.docs.forEach((doc) => {
            patientsList.push({
              patients: doc.data().patients,
            });
          });
          console.log(treatmentsList);
          setTreatments(treatmentsList[0]);
        },
      }
    );
  };

  useEffect(() => {
    getTreatments();
  }, []);

  const renderTreatment = ({ item }: RenderTreatmentProp) => {
    return (
      <View>
        <Text>{treatments.length}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text>Behandlinger {treatments.length}</Text>
      {treatments.length > 0 ? (
        <FlatList
          data={treatments}
          renderItem={renderTreatment}
          keyExtractor={(treatment: any) => treatment}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default VetTreatmentsScreen;

import React, { useEffect, useState } from "react";
import { useUser } from "../../components/(user)/UserContext";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

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
  const [vetId, setVetId] = useState<string | null>(null);

  const getVetID = () => {
    const vetRef = collection(FIRESTORE_DB, "employees");

    const subscriber = onSnapshot(
      query(vetRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const vetIdList: any[] = [];
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            vetIdList.push({
              id: doc.id,
            });
          });
          setVetId(vetIdList[0].id);
        },
      }
    );
  };

  const getTreatments = () => {
    const treatmentRef = collection(FIRESTORE_DB, "treatments");

    const subscriber = onSnapshot(
      query(treatmentRef, where("vetId", "==", vetId)),
      {
        next: (snapshot) => {
          const treatmentsList: any[] = [];
          snapshot.docs.forEach((doc) => {
            treatmentsList.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setTreatments(treatmentsList);
        },
      }
    );
  };

  useEffect(() => {
    getVetID();
  }, []);
  useEffect(() => {
    if (vetId) {
      getTreatments();
    }
  }, [vetId]);

  const renderTreatment = ({ item }: RenderTreatmentProp) => {
    return (
      <TouchableOpacity
        style={[
          styles.display,
          styles.shadow,
          item.status == "waiting"
            ? { backgroundColor: "#94a3b8" }
            : { backgroundColor: "#7dd3fc" },
        ]}
        onPress={() => navigation.navigate("VetTreatment", { treatment: item })}
      >
        <Text>
          Dato: {item.date} kl. {item.time}
        </Text>
        <Text>Behandling: {item.reason}</Text>
        <Text>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Behandlinger</Text>
      {treatments.length > 0 ? (
        <FlatList
          data={treatments}
          renderItem={renderTreatment}
          keyExtractor={(treatment: any) => treatment.id}
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
  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  display: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#52525b",
    marginTop: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#52525b",
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default VetTreatmentsScreen;

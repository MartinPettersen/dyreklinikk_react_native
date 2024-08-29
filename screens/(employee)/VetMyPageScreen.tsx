import React, { useEffect, useState } from "react";
import { useUser } from "../../components/(user)/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { View, Text, StyleSheet } from "react-native";

const VetMyPageScreen = ({ navigation }: any) => {
  const { user } = useUser();

  const [vetInfo, setVetInfo] = useState<any | null>(null);

  const getVetInfo = () => {
    const docRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(docRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          let vetInfoList: any[] = [];
          snapshot.docs.forEach((doc) => {
            vetInfoList.push(doc.data());
          });
          setVetInfo(vetInfoList[0]);
        },
      }
    );
  };

  useEffect(() => {
    getVetInfo();
  }, []);

  return (
    <View style={styles.container}>
      {vetInfo ? (
        <View >
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Navn:</Text> {vetInfo.name}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Fødselsdato:</Text> {vetInfo.birthday}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Ekspertise:</Text> {vetInfo.expertise}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Dato for ansettelse:</Text> {vetInfo.hiringDay}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Telefon:</Text> {vetInfo.phone}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.bold]}>Ansatt som:</Text> {vetInfo.title}
        </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VetMyPageScreen;

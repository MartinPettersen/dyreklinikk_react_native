import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicButton from "../(util)/BasicButton";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

type Props = {
  navigation: any;
  user: any;
};

const PatientMyPage = ({ navigation, user }: Props) => {

  const [ownerId, setOwnerId] = useState<string>("")
  const [owner, setOwner] = useState<any | null>(null)

  const getOwner = () => {
    const ownerRef = collection(FIRESTORE_DB, "owners");
    const subscriber = onSnapshot(
      query(ownerRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const owners: any[] = [];
          snapshot.docs.forEach((doc) => {
            console.log("owner.id", doc.id)
            setOwnerId(doc.id)
            owners.push({
              adress: doc.data().adress,
              email: doc.data().email,
              name: doc.data().name,
              pets: doc.data().pets,
              phone: doc.data().phone,
            })
          })
          setOwner(owners[0])
        }
      }
    )


  }

  useEffect(() => {
    getOwner()
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Velkommen </Text>
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Legg Til Dyr"
          action={() => navigation.navigate("AddPet", {ownerId: ownerId})}
          disabled={ownerId == ""}
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

export default PatientMyPage;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import BasicButton from "../(util)/BasicButton";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DisplayTag from "../(util)/DisplayTag";

type Props = {
  navigation: any;
  user: any;
};

type RenderPetProp = {
  item: any;
};

const PatientMyPage = ({ navigation, user }: Props) => {
  const [ownerId, setOwnerId] = useState<string>("");
  const [owner, setOwner] = useState<any | null>(null);

  const getOwner = () => {
    const ownerRef = collection(FIRESTORE_DB, "owners");
    const subscriber = onSnapshot(
      query(ownerRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const owners: any[] = [];
          snapshot.docs.forEach((doc) => {
            console.log("owner.id", doc.id);
            setOwnerId(doc.id);
            owners.push({
              adress: doc.data().adress,
              email: doc.data().email,
              name: doc.data().name,
              pets: doc.data().pets,
              phone: doc.data().phone,
            });
          });
          console.log(owners[0]);
          setOwner(owners[0]);
        },
      }
    );
  };

  useEffect(() => {
    getOwner();
  }, []);

  const renderPet = ({ item }: RenderPetProp) => {
    return <DisplayTag label={item.name} action={() => console.log("da")} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Velkommen </Text>
      {owner ? (
        <View>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Navn:</Text> {owner.name}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Adresse:</Text>{" "}
            {owner.adress}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>E-Post:</Text>{" "}
            {owner.email}
          </Text>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>Telefon:</Text>{" "}
            {owner.phone}
          </Text>
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <BasicButton
          label="Legg Til Dyr"
          action={() => navigation.navigate("AddPet", { ownerId: ownerId })}
          disabled={ownerId == ""}
        />
      </View>
      {owner && owner.pets.length > 0 ? (
        <View style={styles.petsContainer}>
          {
            <FlatList
              data={owner.pets}
              renderItem={renderPet}
              keyExtractor={(pet: any) => pet.name}
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
    justifyContent: "flex-start",
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
  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  petsContainer: {
    margin: 0,
  },
});

export default PatientMyPage;

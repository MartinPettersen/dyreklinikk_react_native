import React, { useEffect, useState } from "react";
import { Clinic } from "../../utils/types";
import { Text, TextInput, View, StyleSheet } from "react-native";
import PetDropDownMenu from "../(util)/PetDropDownMenu";
import BasicButton from "../(util)/BasicButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  clinic: Clinic;
  vet: any;
  navigation: any;
  date: string;
  time: any;
  owner: any;
};

const BookingPage = ({ clinic, vet, date, time, owner, navigation }: Props) => {
  const [pet, setPet] = useState<any | null>(null);
  const [reason, setReason] = useState<string>("");
  const [pets, setPets] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (owner) {
      setPets(owner.pets);
    }
  }, [owner]);

  const registerBooking = async () => {
    const order = {
      vetId: vet.id,
      clinicId: clinic.id,
      owner: owner.id,
      pet: pet.petIndex,
      reason: reason,
      date: date,
      time: time,
      status: "waiting",
      note: "",
    };
    const docBooking = await addDoc(
      collection(FIRESTORE_DB, "treatments"),
      order
    );

    const bookingId = docBooking.id;

    const clinicRef = doc(FIRESTORE_DB, `clinics/${clinic.id}`);
    await updateDoc(clinicRef, {
      treatments: arrayUnion(bookingId),
      patients: arrayUnion({ ownerId: owner.id, patient: pet.petIndex }),
    });

    const employeeRef = doc(FIRESTORE_DB, `employees/${vet.id}`);
    await updateDoc(employeeRef, {
      patients: arrayUnion({ ownerId: owner.id, patient: pet.petIndex }),
    });

    const tempPets = pets;
    tempPets[pet.petIndex].treatments = [
      ...(pets[pet.petIndex].treatments || []),
      bookingId,
    ];

    const ownerRef = doc(FIRESTORE_DB, `owners/${owner.id}`);
    await updateDoc(ownerRef, {
      pets: pets,
    });
    navigation.navigate("Start");

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
        >{`Time hos ${vet.name} ved ${clinic.name} den ${date} klokken ${time}`}</Text>
      </View>

      <View style={[styles.dropdownContainer, , { zIndex: 3 }]}>
        <PetDropDownMenu
          open={open}
          setOpen={setOpen}
          pet={pet}
          setPet={setPet}
          pets={pets}
          setPets={setPets}
        />
      </View>

      <Text>Beskriv kort grunnen for besøket</Text>
      <TextInput
        placeholder="Grunnen for besøket"
        onChangeText={(text: string) => setReason(text)}
        value={reason}
        style={styles.inputField}
        multiline={true}
        blurOnSubmit={true}
      />

      <BasicButton
        label="Bestil Time"
        action={() => registerBooking()}
        disabled={reason == "" || pet == null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    paddingBottom: 2,
    paddingTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    margin: 20,
    backgroundColor: "white",
    width: "60%",
    fontSize: 16,
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  dropdownContainer: {
    width: "60%",
    paddingTop: 10,
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "60%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default BookingPage;

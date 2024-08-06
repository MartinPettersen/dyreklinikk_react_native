import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Clinic } from "../../utils/types";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import DeleteButton from "../(util)/DeleteButton";
import DropDownMenu from "../(util)/DropDownMenu";
import HorizontalLine from "../(util)/HorizontalLine";
import IconButton from "../(util)/IconButton";

type Props = {
  clinic: Clinic;
  navigation: any;
};

const ClinicPage = ({ clinic, navigation }: Props) => {
  const [name, setName] = useState(clinic.name);
  const [editingName, setEditingName] = useState(false);

  const [adress, setAdress] = useState(clinic.adress);
  const [editingAdress, setEditingAdress] = useState(false);

  const [employees, setEmployess] = useState(clinic.employees);

  const [openingHour, setOpeningHour] = useState<string | null>(
    clinic.openingHour
  );
  const [editingOpeningHour, setEditingOpeningHour] = useState(false);

  const [closingHour, setClosingHour] = useState<string | null>(
    clinic.closingHour
  );
  const [editingClosingHour, setEditingClosingHour] = useState(false);

  const ref = doc(FIRESTORE_DB, `clinics/${clinic.id}`);
  const updateClinic = async () => {
    updateDoc(ref, {
      name: name,
      adress: adress,
      openingHour: openingHour,
      closingHour: closingHour,
      employees: employees,
    });
    navigation.navigate("Clinics");
  };
  const deleteClinic = async () => {
    deleteDoc(ref);
    navigation.navigate("Clinics");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Oppdater Dyreklinikk</Text>
      <HorizontalLine />
      <View style={styles.sideButton}>
        {editingName ? (
          <TextInput
            placeholder="Navn på Klinikken"
            onChangeText={(text: string) => setName(text)}
            value={name}
            style={styles.inputField}
          />
        ) : (
          <Text>Navn: {name}</Text>
        )}

        <IconButton
          label={"edit"}
          action={() => setEditingName(!editingName)}
          disabled={false}
        />
      </View>
      <View style={styles.sideButton}>
        {editingAdress ? (
          <TextInput
            placeholder="Adressen til Klinikken"
            onChangeText={(text: string) => setAdress(text)}
            value={adress}
            style={styles.inputField}
          />
        ) : (
          <Text>Adresse: {adress}</Text>
        )}

        <IconButton
          label={"edit"}
          action={() => setEditingAdress(!editingAdress)}
          disabled={false}
        />
      </View>

      <View style={[styles.sideButton, { width: "30%", zIndex: 3 }]}>
        {editingOpeningHour ? (
          <DropDownMenu
            open={editingOpeningHour}
            setOpen={setEditingOpeningHour}
            selectedTime={openingHour}
            setSelectedTime={setOpeningHour}
          />
        ) : (
          <Text>Åpner: {openingHour}</Text>
        )}
        <IconButton
          label={"edit"}
          action={() => setEditingOpeningHour(!editingOpeningHour)}
          disabled={false}
        />
      </View>

      <View style={[styles.sideButton, { width: "30%", zIndex: 2 }]}>
        {editingClosingHour ? (
          <DropDownMenu
            open={editingClosingHour}
            setOpen={setEditingClosingHour}
            selectedTime={closingHour}
            setSelectedTime={setClosingHour}
          />
        ) : (
          <Text>Stenger: {closingHour}</Text>
        )}
        <IconButton
          label={"edit"}
          action={() => setEditingClosingHour(!editingClosingHour)}
          disabled={false}
        />
      </View>
      <View style={styles.sideButton}>
        <Text>Ansatte</Text>
        <IconButton
          label={"user-plus"}
          action={() => navigation.navigate("AddEmployee", {clinic: clinic})}
          disabled={false}
        />
      </View>
      <View>
        {employees.length > 0?
        employees.map((employee) => (
            <Text>{employee}cd</Text>
        ))   
    : null}
      </View>
      <View style={{ margin: 20 }}>
        <BasicButton
          label={"Oppdater"}
          action={() => updateClinic()}
          disabled={false}
        />
      </View>
      <HorizontalLine />
      <View style={{ margin: 60 }}>
        <DeleteButton
          label={"Delete"}
          action={() => deleteClinic()}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sideButton: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
  inputField: {
    padding: 10,
    paddingBottom: 2,
    paddingTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    backgroundColor: "white",
    width: "60%",
    fontSize: 16,
  },
  headline: {
    fontSize: 40,
    margin: 0,
    color: "#52525b",
    fontWeight: "bold",
  },
});

export default ClinicPage;

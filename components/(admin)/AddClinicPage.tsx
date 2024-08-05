import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import SmallButton from "../(util)/SmallButton";
import DropDownMenu from "../(util)/DropDownMenu";

type Props = {
  navigation: any;
};

const AddClinicPage = ({ navigation }: Props) => {
  const [name, SetName] = useState<string>();
  const [adress, SetAdress] = useState<string>();
  const [openingHour, setOpeningHour] = useState<string | null>("00:00");
  const [closingHour, setClosingHour] = useState<string | null>("00:00");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [patients, setPatients] = useState<string[]>([]);

  const [settingOpeningHours, setSettingOpeningHours] = useState(false);
  const [settingClosingHours, setSettingClosingHours] = useState(false);


  const addClinic = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "clinics"), {
      name: name,
      adress: adress,
      openingHour: openingHour,
      closingHour: closingHour,
    });
    navigation.navigate("Clinics");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Legg til ny Klinikk</Text>
      <TextInput
        placeholder="Navn på Klinikken"
        onChangeText={(text: string) => SetName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Adressen til Klinikken"
        onChangeText={(text: string) => SetAdress(text)}
        value={adress}
        style={styles.inputField}
      />
      <View style={[styles.dropdownContainer, , {zIndex: 3}]}>
        <Text style={styles.timerText}>Åpner    </Text>
        <DropDownMenu
          open={settingOpeningHours}
          setOpen={setSettingOpeningHours}
          selectedTime={openingHour}
          setSelectedTime={setOpeningHour}
        />
      </View>
      <View style={[styles.dropdownContainer, {zIndex: 2}]}>
        <Text style={styles.timerText}>Stenger</Text>
        <DropDownMenu
          open={settingClosingHours}
          setOpen={setSettingClosingHours}
          selectedTime={closingHour}
          setSelectedTime={setClosingHour}
        />
      </View>
      <View style={{ width: "60%", paddingTop: 10, zIndex: 1 }}>
        <BasicButton
          label={"Legg Til"}
          action={() => addClinic()}
          disabled={name === ""}
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
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  timerText: {
    fontSize: 20,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  dropdownContainer:{ 
    width: "30%",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default AddClinicPage;

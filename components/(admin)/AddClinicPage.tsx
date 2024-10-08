import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";
import SmallButton from "../(util)/SmallButton";
import DropDownMenu from "../(util)/DropDownMenu";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const AddClinicPage = ({ navigation }: Props) => {
  const [name, setName] = useState<string>();
  const [adress, setAdress] = useState<string>();
  const [openingHour, setOpeningHour] = useState<string | null>("00:00");
  const [closingHour, setClosingHour] = useState<string | null>("00:00");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [patients, setPatients] = useState<string[]>([]);
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [settingOpeningHours, setSettingOpeningHours] = useState(false);
  const [settingClosingHours, setSettingClosingHours] = useState(false);


  const addClinic = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "clinics"), {
      name: name,
      adress: adress,
      openingHour: openingHour,
      closingHour: closingHour,
      treatments: treatments,
      employees: employees,
      patients: patients
    });
    navigation.navigate("Clinics");
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} enabled style={styles.container}>


      <Text style={styles.headline}>Legg til ny Klinikk</Text>
      <TextInput
        placeholder="Navn på Klinikken"
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.inputField}
        />
      <TextInput
        placeholder="Adressen til Klinikken"
        onChangeText={(text: string) => setAdress(text)}
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
          </KeyboardAvoidingView>
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

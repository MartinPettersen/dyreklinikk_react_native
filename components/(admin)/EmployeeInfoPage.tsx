import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import IconButton from "../(util)/IconButton";
import EditableText from "../(util)/EditableText";
import HorizontalLine from "../(util)/HorizontalLine";
import DeleteButton from "../(util)/DeleteButton";
import BasicButton from "../(util)/BasicButton";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import PatientDisplay from "../(employee)/PatientDisplay";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  employee: any;
  navigation: NavigationProp<RootStackParamList>;
  user: any;
};

type RenderPatientProp = {
  item: any;
};

const EmployeeInfoPage = ({ employee, navigation, user }: Props) => {
  const [name, setName] = useState(employee.name);
  const [editingName, setEditingName] = useState(false);
  console.log("employee", employee);
  console.log("employee.patients.length ", employee.patients.length);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone);
  const [expertise, setExpertise] = useState(employee.expertise);
  const [information, setInformation] = useState(employee.phone);

  const ref = doc(FIRESTORE_DB, `employees/${employee.id}`);
  const updateEmployee = async () => {
    updateDoc(ref, {
      name: name,
      email: email,
      phone: phone,
      expertise: expertise,
      information: information,
    });
    navigation.navigate("AdminEmployees");
  };
  const deleteEmployee = async () => {
    deleteDoc(ref);
    navigation.navigate("AdminEmployees");
  };

  const renderPatient = ({ item }: RenderPatientProp) => {
    return (
      <PatientDisplay patient={item} navigation={navigation} user={user} />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{employee.name}</Text>
      <View style={styles.sideButton}>
        {editingName ? (
          <TextInput
            placeholder="Navn på Ansatte"
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
      <EditableText
        editableText={email}
        setEditableText={setEmail}
        label={`E-Post: ${email}`}
      />
      <EditableText
        editableText={phone}
        setEditableText={setPhone}
        label={`Telefon: ${phone}`}
      />
      <EditableText
        editableText={expertise}
        setEditableText={setExpertise}
        label={`Ekspertise: ${expertise}`}
      />
      <EditableText
        editableText={information}
        setEditableText={setInformation}
        label={`Informasjon: ${information}`}
      />

      <Text style={[styles.text, { fontWeight: "bold" }]}>Pasienter:</Text>

      {employee.patients.length > 0 ? (
          <FlatList
            data={employee.patients}
            renderItem={renderPatient}
            keyExtractor={(patient: any, index: number) =>
              `${patient.patient}${patient.ownerId}${index}`
            }
            contentContainerStyle={{paddingBottom: 20}}
            />
        ) : null}
      <View style={{ padding: 0 }}>
        <BasicButton
          label={"Oppdater"}
          action={() => updateEmployee()}
          disabled={false}
        />
      </View>

      <HorizontalLine />
      <View style={{ padding: 20 }}>
        <DeleteButton
          label={"Delete"}
          action={() => deleteEmployee()}
          disabled={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headline: {
    fontSize: 40,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  text: {
    color: "#52525b",
  },
  sideButton: {
    flexDirection: "row",
    margin: 10,
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
});
export default EmployeeInfoPage;

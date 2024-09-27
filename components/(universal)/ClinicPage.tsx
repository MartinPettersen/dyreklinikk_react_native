import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList, ScrollView } from "react-native";
import { Clinic } from "../../utils/types";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import EmployeeTag from "../(util)/EmployeeTag";
import ClinicBookingPage from "./ClinicBookingPage";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  clinic: Clinic;
  navigation: NavigationProp<RootStackParamList>;
};

type RenderEmployeeProp = {
  item: any;
};

const ClinicPage = ({ clinic, navigation }: Props) => {
  const [employees, setEmployees] = useState<any[] | null>(null);

  const [selectedVet, setSelectedVet] = useState<any | null>(null);

  const getEmployees = () => {
    const employeeRef = collection(FIRESTORE_DB, "employees");

    const subscriber = onSnapshot(
      query(employeeRef, where("workplace", "==", clinic.id)),
      {
        next: (snapshot) => {
          const employeeList: any[] = [];
          snapshot.docs.forEach((doc) => {
            employeeList.push({
              name: doc.data().name,
              expertise: doc.data().expertise,
              patients: doc.data().patients,
              id: doc.id,
            });
          });
          setEmployees(employeeList);
          setSelectedVet(employeeList[0]);
        },
      }
    );
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const renderEmployee = ({ item }: RenderEmployeeProp) => {
    return <EmployeeTag employee={item} action={() => setSelectedVet(item)} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>

      <Text style={styles.headline}>{`${clinic.name}`}</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Åpningstider: </Text>
        {`${clinic.openingHour}-${clinic.closingHour}`}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Adresse: </Text>
        {clinic.adress}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}></Text>
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Våre Ansatte:</Text>
      </Text>
      {employees ? (
        <View style={styles.employeesContainer}>
          {
            <FlatList
              data={employees}
              renderItem={renderEmployee}
              keyExtractor={(employee: any) => employee.id}
            />
          }
        </View>
      ) : null}
      {selectedVet ? <ClinicBookingPage vet={selectedVet} clinic={clinic} navigation={navigation}/> : null}
      </ScrollView>
    
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
  employeesContainer: {
    margin: 0,
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center"
  }
});

export default ClinicPage;

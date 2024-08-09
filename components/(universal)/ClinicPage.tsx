import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Clinic } from "../../utils/types";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import EmployeeTag from "../(util)/EmployeeTag";

type Props = {
  clinic: Clinic;
  navigation: any;
};

type RenderEmployeeProp = {
  item: any;
};

const ClinicPage = ({ clinic, navigation }: Props) => {
  const [employees, setEmployees] = useState<any[] | null>(null);

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
              id: doc.data().id,
            });
          });
          console.log(employeeList)
          setEmployees(employeeList);
        },
      }
    );

  };

  useEffect(() => {
    getEmployees();
  }, []);

  const renderEmployee = ({item}: RenderEmployeeProp) => {
    return <EmployeeTag employee={item} action={() => console.log("h")} />
  }

  return (
    <SafeAreaView style={styles.container}>
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
  },
});

export default ClinicPage;

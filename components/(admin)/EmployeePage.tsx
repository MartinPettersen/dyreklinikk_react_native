import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import DisplayTag from "../(util)/DisplayTag";
import HorizontalLine from "../(util)/HorizontalLine";

type Props = {
  navigation: any;
};

type RenderEmployeeProp = {
    item: any
  }

const EmployeePage = ({ navigation }: Props) => {
  const [employees, setEmployees] = useState<any[] | null>(null);


  useEffect(() => {
    const employeesRef = collection(FIRESTORE_DB, "employees");

    const subscriber = onSnapshot(employeesRef, {
      next: (snapshot) => {
        const employeesList: any[] = [];
        snapshot.docs.forEach((doc) => {
            employeesList.push({
            id: doc.id,
            ...doc.data(),
          } as any);
        });
        setEmployees(employeesList);
      },
    });
    return () => subscriber();
  }, []);

  const renderEmployee = ({item}: RenderEmployeeProp) => {
    return <DisplayTag label={item.name} action={() => navigation.navigate("AdminEmployee", {employee: item})} />
  }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.headline}>Ansatte</Text>
      <HorizontalLine />
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
  )
  ;
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    employeesContainer: {
      margin: 0,
    },
    headline: {
      fontSize: 40,
      margin: 20,
      color: "#52525b",
      fontWeight: "bold",
    },
  });

export default EmployeePage;

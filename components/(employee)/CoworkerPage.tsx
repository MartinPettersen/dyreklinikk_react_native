import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PatientDisplay from "./PatientDisplay";
import CoworkerPatientDisplay from "./CoworkerPatientDisplay";

type Props = {
  navigation: any;
  employee: any;
};

type RenderPatientProp = {
  item: any;
};
const CoworkerPage = ({ navigation, employee }: Props) => {
  const renderPatient = ({ item }: RenderPatientProp) => {
    return <CoworkerPatientDisplay patient={item} navigation={navigation} user={undefined} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.bold}>Navn: </Text>
        {employee.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Ekspertise: </Text>
        {employee.expertise}
      </Text>
      <Text style={styles.bold}>Pasienter: </Text>
      {employee.patients.length > 0 ? (
        <FlatList
          data={employee.patients}
          renderItem={renderPatient}
          keyExtractor={(patient: any, index: number) =>
            `${patient.patient}${patient.ownerId}${index}`
          }
        />
      ) : null}
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
    alignItems: "center",
  },
});

export default CoworkerPage;

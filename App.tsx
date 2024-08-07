import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AdminScreen from "./screens/(admin)/AdminScreen";
import TimeTableScreen from "./screens/TimeTableScreen";
import AdminClinicsScreen from "./screens/(admin)/AdminClinicsScreen";
import AddClinicScreen from "./screens/(admin)/AddClinicScreen";
import AdminClinicScreen from "./screens/(admin)/AdminClinicScreen";
import AddEmployeeScreen from "./screens/(admin)/AddEmployeeScreen";
import AdminEmployeesScreen from "./screens/(admin)/AdminEmployeesScreen";
import StartScreen from "./screens/(preloggin)/StartScreen";
import EmployeeStartScreen from "./screens/(employee)/EmployeeStartScreen";
import PatientStartScreen from "./screens/(patient)/PatientStartScreen";
import LoginScreen from "./screens/(preloggin)/LoginScreen";
import SignUpScreen from "./screens/(preloggin)/SignUpScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

const PatientStack = createNativeStackNavigator();

function PatientLayout () {
  return <PatientStack.Navigator>
    <PatientStack.Screen name="Start" component={PatientStartScreen} />
  </PatientStack.Navigator>
}

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user)
      setUser(user)
    })
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      { user?
        <Stack.Screen name="Patient" component={PatientLayout} />
:
<>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PatientStart" component={PatientStartScreen} />
        <Stack.Screen name="EmployeeStart" component={EmployeeStartScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Time" component={TimeTableScreen} />
        <Stack.Screen name="Clinics" component={AdminClinicsScreen} />
        <Stack.Screen name="AddClinic" component={AddClinicScreen} />
        <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
        <Stack.Screen name="AdminClinic" component={AdminClinicScreen} />
        <Stack.Screen name="AdminEmployees" component={AdminEmployeesScreen} />
</>
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

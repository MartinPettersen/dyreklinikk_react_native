import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AdminScreen from "./screens/(admin)/AdminScreen";
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
import { FIREBASE_AUTH, FIRESTORE_DB } from "./firebaseConfig";
import { UserProvider } from "./components/(user)/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PatientMyPageScreen from "./screens/(patient)/PatientMyPageScreen";
import AddOwnerInfoScreen from "./screens/(patient)/AddOwnerInfoScreen";
import AddPetScreen from "./screens/(patient)/AddPetScreen";
import PetInfoScreen from "./screens/(patient)/PetInfoScreen";
import ClinicsScreen from "./screens/(universal)/ClinicsScreen";
import ClinicScreen from "./screens/(universal)/ClinicScreen";
import AdminEmployeeScreen from "./screens/(admin)/AdminEmployeeScreen";
import MyPatientsScreen from "./screens/(employee)/MyPatientsScreen";
import BookingScreen from "./screens/(patient)/BookingScreen";
import PatientTreatmentsScreen from "./screens/(patient)/PatientTreatmentsScreen";
import VetTreatmentsScreen from "./screens/(employee)/VetTreatmentsScreen";
import VetPatientInfoScreen from "./screens/(employee)/VetPatientInfoScreen";
import VetTreatmentScreen from "./screens/(employee)/VetTreatmentScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./utils/types";
import BasicButton from "./components/(util)/BasicButton";
import BackButton from "./components/(util)/BackButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();

const PatientStack = createNativeStackNavigator();
const EmployeeStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

type PatientScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;


function PatientHomeStack() {
  return (
    <PatientStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <BackButton
            action={() => navigation.goBack()}
            label="Tilbake"
            disabled={false}
          />
        ),
        headerTitle: "",
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
      })}
    >
      <PatientStack.Screen name="Start" component={PatientStartScreen} />
      <PatientStack.Screen name="MyPage" component={PatientMyPageScreen} />
      <PatientStack.Screen name="AddOwnerInfo" component={AddOwnerInfoScreen} />
      <PatientStack.Screen name="AddPet" component={AddPetScreen} />
      <PatientStack.Screen name="PetInfo" component={PetInfoScreen} />
      <PatientStack.Screen name="Clinics" component={ClinicsScreen} />
      <PatientStack.Screen name="Clinic" component={ClinicScreen} />
      <PatientStack.Screen name="Booking" component={BookingScreen} />
      <PatientStack.Screen
        name="PatientTreatments"
        component={PatientTreatmentsScreen}
      />
    </PatientStack.Navigator>
  );
}

function EmployeeHomeStack() {
  return (
    <EmployeeStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <BackButton
            action={() => navigation.goBack()}
            label="Tilbake"
            disabled={false}
          />
        ),
      })}
    >
      <EmployeeStack.Screen
        name="Start"
        component={EmployeeStartScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton
              action={() => navigation.goBack()}
              label="Tilbake"
              disabled={false}
            />
          ),
        })}
      />
      <EmployeeStack.Screen name="MyPatients" component={MyPatientsScreen} />
      <EmployeeStack.Screen
        name="VetTreatments"
        component={VetTreatmentsScreen}
      />
      <EmployeeStack.Screen
        name="VetTreatment"
        component={VetTreatmentScreen}
      />
      <EmployeeStack.Screen
        name="VetPatientInfo"
        component={VetPatientInfoScreen}
      />
    </EmployeeStack.Navigator>
  );
}

function AdminHomeStack() {
  return (
    <AdminStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <BackButton
            action={() => navigation.goBack()}
            label="Tilbake"
            disabled={false}
          />
        ),
      })}
    >
      <AdminStack.Screen name="Start" component={AdminScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Clinics" component={AdminClinicsScreen} />
      <Stack.Screen name="AddClinic" component={AddClinicScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
      <Stack.Screen name="AdminClinic" component={AdminClinicScreen} />
      <Stack.Screen name="AdminEmployees" component={AdminEmployeesScreen} />
      <Stack.Screen name="AdminEmployee" component={AdminEmployeeScreen} />
    </AdminStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<any | null>(null);

  const getRole = (user: any) => {
    const roleRef = collection(FIRESTORE_DB, "roles");
    const subscriber = onSnapshot(
      query(roleRef, where("email", "==", user!.email)),
      {
        next: (snapshot) => {
          const roles: any[] = [];
          snapshot.docs.forEach((doc) => {
            roles.push({
              email: doc.data().email,
              role: doc.data().role,
            });
          });
          setRole(roles[0]);
        },
      }
    );
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        getRole(user);
      } else {
        setRole(null);
      }
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {role && role.role == "patient" ? (
              <Stack.Screen
                name="Patient"
                component={PatientHomeStack}
                initialParams={{ user: user }}
              />
            ) : role && role.role == "employee" ? (
              <Stack.Screen
                name="Employee"
                component={EmployeeHomeStack}
                initialParams={{ user: user }}
              />
            ) : role && role.role == "admin" ? (
              <Stack.Screen
                name="Admin"
                component={AdminHomeStack}
                initialParams={{ user: user }}
              />
            ) : (
              <>
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Clinics" component={ClinicsScreen} />
                <Stack.Screen name="Clinic" component={ClinicScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
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

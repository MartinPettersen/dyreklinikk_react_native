import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminScreen from './screens/(admin)/AdminScreen';
import TimeTableScreen from './screens/TimeTableScreen';
import AdminClinicsScreen from './screens/(admin)/AdminClinicsScreen';
import AddClinicScreen from './screens/(admin)/AddClinicScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Admin" component={AdminScreen}/>
        <Stack.Screen name="Time" component={TimeTableScreen}/>
        <Stack.Screen name="Clinics" component={AdminClinicsScreen}/>
        <Stack.Screen name="AddClinic" component={AddClinicScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

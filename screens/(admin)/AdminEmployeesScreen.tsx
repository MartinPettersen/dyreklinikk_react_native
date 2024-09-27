import React from "react";
import { View, Text } from "react-native";
import EmployeePage from "../../components/(admin)/EmployeePage";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminEmployees'>;
};

const AdminEmployeesScreen = ({navigation}: Props) => {
  return (
    <EmployeePage navigation={navigation}/>
  );
};

export default AdminEmployeesScreen;

import React from "react";
import { View, Text } from "react-native";
import EmployeePage from "../../components/(admin)/EmployeePage";

const AdminEmployeesScreen = ({navigation}: any) => {
  return (
    <EmployeePage navigation={navigation}/>
  );
};

export default AdminEmployeesScreen;

import React from "react";
import { View, Text } from "react-native";
import ClinicsPage from "../../components/(admin)/ClinicsPage";

const AdminClinicsScreen = ({navigation}: any) => {
  return (
    <ClinicsPage navigation={navigation} />
  );
};

export default AdminClinicsScreen;

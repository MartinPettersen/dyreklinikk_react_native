import React from "react";
import { View, Text } from "react-native";
import ClinicsPage from "../../components/(admin)/ClinicsPage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";
import ClinicPage from "../../components/(admin)/ClinicPage";

type ClinicRouteProp = RouteProp<RootStackParamList, "AdminClinic">;


const AdminClinicScreen = ({navigation}: any) => {

    const route = useRoute<ClinicRouteProp>();
    const { clinic } = route.params;
  

  return (
    <ClinicPage navigation={navigation} clinic={clinic}/>
  );
};

export default AdminClinicScreen;

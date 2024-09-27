import React from "react";
import { View, Text } from "react-native";
import ClinicsPage from "../../components/(admin)/ClinicsPage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";
import ClinicPage from "../../components/(admin)/ClinicPage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ClinicRouteProp = RouteProp<RootStackParamList, "AdminClinic">;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminClinic'>;
};

const AdminClinicScreen = ({navigation}: Props) => {

    const route = useRoute<ClinicRouteProp>();
    const { clinic } = route.params;
  

  return (
    <ClinicPage navigation={navigation} clinic={clinic}/>
  );
};

export default AdminClinicScreen;

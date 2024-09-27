import React from "react";
import { View, Text } from "react-native";
import ClinicsPage from "../../components/(admin)/ClinicsPage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminClinics'>;
};

const AdminClinicsScreen = ({navigation}: Props) => {
  return (
    <ClinicsPage navigation={navigation} />
  );
};

export default AdminClinicsScreen;

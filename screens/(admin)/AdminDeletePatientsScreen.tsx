import React from 'react'
import { View } from 'react-native'
import AdminDeletePatientsPage from '../../components/(admin)/AdminDeletePatientsPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDeletePatients'>;
};

const AdminDeletePatientsScreen = ({navigation}: Props) => {
  return (
    <AdminDeletePatientsPage navigation={navigation}/>
  )
}

export default AdminDeletePatientsScreen
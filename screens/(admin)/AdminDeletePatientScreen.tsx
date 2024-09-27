import React from 'react'
import AdminDeletePatientPage from '../../components/(admin)/AdminDeletePatientPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDeletePatient'>;
  route: RouteProp<RootStackParamList, 'AdminDeletePatient'>;
};

const AdminDeletePatientScreen = ({navigation, route}: Props) => {

    const { deleteRequest } = route.params;
  return (
    <AdminDeletePatientPage navigation={navigation} deleteRequest={deleteRequest}/>
  )
}

export default AdminDeletePatientScreen
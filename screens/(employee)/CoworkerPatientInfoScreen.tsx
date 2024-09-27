import React from 'react'
import PatientInfoPage from '../../components/(employee)/PatientInfoPage'
import CoworkerPatientInfoPage from '../../components/(employee)/CoworkerPatientInfoPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CoworkerPatientInfo'>;
  route: RouteProp<RootStackParamList, 'CoworkerPatientInfo'>;
};

const VetPatientInfoScreen = ({navigation, route}: Props) => {
  
    const {  owner, patient, user } = route.params; 
    return (
    <CoworkerPatientInfoPage navigation={navigation} owner={owner} patient={patient} user={user}/>
  )
}

export default VetPatientInfoScreen
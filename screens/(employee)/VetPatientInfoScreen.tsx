import React from 'react'
import PatientInfoPage from '../../components/(employee)/PatientInfoPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type VetPatientInfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VetPatientInfo'>;
  route: RouteProp<RootStackParamList, 'VetPatientInfo'>;
};


const VetPatientInfoScreen = ({navigation, route}: VetPatientInfoScreenProps) => {
  
    const {  owner, patient, user } = route.params; 
    return (
    <PatientInfoPage navigation={navigation} owner={owner} patient={patient} user={user}/>
  )
}

export default VetPatientInfoScreen
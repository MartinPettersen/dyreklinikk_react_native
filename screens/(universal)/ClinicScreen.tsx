import React from 'react'
import ClinicPage from '../../components/(universal)/ClinicPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type ClinicScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Clinic'>;
  route: RouteProp<RootStackParamList, 'Clinic'>;
};

const ClinicScreen: React.FC<ClinicScreenProps> = ({navigation, route}) =>  {
  
  const { clinic } = route.params; 

  return (
    <ClinicPage clinic={clinic} navigation={navigation} />
  )
}

export default ClinicScreen
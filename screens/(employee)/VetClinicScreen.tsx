import React from 'react'
import VetClinicPage from '../../components/(employee)/VetClinicPage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type VetClinicScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VetClinic'>;
  route: RouteProp<RootStackParamList, 'VetClinic'>;
};

const VetClinicScreen = ({navigation, route}: VetClinicScreenProps) => {

    const { clinic } = route.params

  return (
    <VetClinicPage navigation={navigation} clinic={clinic}/>
  )
}

export default VetClinicScreen
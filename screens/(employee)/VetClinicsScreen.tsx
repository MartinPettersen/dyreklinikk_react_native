import React from 'react'
import VetClinicsPage from '../../components/(employee)/VetClinicsPage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Vet } from '../../utils/types';

type VetClinicsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VetClinics'>;
};

const VetClinicsScreen = ({navigation}: VetClinicsScreenProps) => {
  return (
    <VetClinicsPage navigation={navigation} />
  )
}

export default VetClinicsScreen
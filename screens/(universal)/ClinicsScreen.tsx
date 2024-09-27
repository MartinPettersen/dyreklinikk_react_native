import React from 'react'
import ClinicsPage from '../../components/(universal)/ClinicsPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type ClinicsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Clinics'>;
};


const ClinicsScreen = ({navigation}: ClinicsScreenProps) => {
  return (
    <ClinicsPage navigation={navigation}/>
  )
}

export default ClinicsScreen
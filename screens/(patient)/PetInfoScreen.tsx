import React from 'react'
import PetInfoPage from '../../components/(patient)/PetInfoPage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type PetInfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PetInfo'>;
  route: RouteProp<RootStackParamList, 'PetInfo'>;
};


const PetInfoScreen: React.FC<PetInfoScreenProps> = ({navigation, route}) =>  {
    const { pet } = route.params; 
  return (
    <PetInfoPage pet={pet}/>
  )
}

export default PetInfoScreen
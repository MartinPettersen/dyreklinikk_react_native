import React from 'react'
import { useUser } from "../../components/(user)/UserContext";
import AddPetPage from '../../components/(patient)/AddPetPage';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type AddPetScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPet'>;
  route: RouteProp<RootStackParamList, 'AddPet'>;
};


const AddPetScreen: React.FC<AddPetScreenProps> = ({navigation, route}) =>  {
    const { ownerId } = route.params; 
  return (
    <AddPetPage navigation={navigation} ownerId={ownerId} />
  )
}

export default AddPetScreen
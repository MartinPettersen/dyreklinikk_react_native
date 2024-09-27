import React from 'react'
import AddOwnerInfo from '../../components/(patient)/AddOwnerInfo'
import { useUser } from "../../components/(user)/UserContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type AddOwnerInfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddOwnerInfo'>;
};
const AddOwnerInfoScreen = ({navigation}: AddOwnerInfoScreenProps) => {
    const { user } = useUser();

  return (
    <AddOwnerInfo navigation={navigation} email={user?.email}/>
  )
}

export default AddOwnerInfoScreen
import React from 'react'
import AddClinicPage from '../../components/(admin)/AddClinicPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddClinic'>;
};


const AddClinicScreen = ({navigation}: Props) => {
  return (
    <AddClinicPage navigation={navigation}/>
  )
}

export default AddClinicScreen
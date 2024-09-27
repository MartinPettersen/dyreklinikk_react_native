import React from 'react'
import AddEmployePage from '../../components/(admin)/AddEmployePage'
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddEmployee'>;
};

type AddEmployeeRouteProp = RouteProp<RootStackParamList, "AddEmployee">;

const AddEmployeeScreen = ({navigation}: Props) => {

  const route = useRoute<AddEmployeeRouteProp>();
  const { clinic } = route.params;

  return (
    <AddEmployePage navigation={navigation} clinic={clinic}/>
  )
}

export default AddEmployeeScreen
import React from 'react'
import AddEmployePage from '../../components/(admin)/AddEmployePage'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type AddEmployeeRouteProp = RouteProp<RootStackParamList, "AddEmployee">;

const AddEmployeeScreen = ({navigation}: any) => {

  const route = useRoute<AddEmployeeRouteProp>();
  const { clinic } = route.params;

  return (
    <AddEmployePage navigation={navigation} clinic={clinic}/>
  )
}

export default AddEmployeeScreen
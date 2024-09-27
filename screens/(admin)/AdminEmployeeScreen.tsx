import React from 'react'
import EmployeeInfoPage from '../../components/(admin)/EmployeeInfoPage'
import { useUser } from "../../components/(user)/UserContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminEmployee'>;
  route: RouteProp<RootStackParamList, 'AdminEmployee'>;
};

const AdminEmployeeScreen = ({navigation, route}: Props) => {
  
    const { employee } = route.params;
    const { user } = useUser();
  
    return (
    <EmployeeInfoPage employee={employee} navigation={navigation} user={user}/>
  )
}

export default AdminEmployeeScreen
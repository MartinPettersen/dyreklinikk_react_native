import React from 'react'
import { View } from 'react-native'
import CoworkerPage from '../../components/(employee)/CoworkerPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Coworker'>;
  route: RouteProp<RootStackParamList, 'Coworker'>;
};

const CoworkerScreen = ({navigation, route}: Props) => {

  const { employee } = route.params

  return (
    <CoworkerPage navigation={navigation} employee={employee}/>
  )
}

export default CoworkerScreen
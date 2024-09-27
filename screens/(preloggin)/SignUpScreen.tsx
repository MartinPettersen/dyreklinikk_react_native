import React from 'react'
import SignUpPage from '../../components/(preloggin)/SignUpPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};
const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  return (
    <SignUpPage navigation={navigation}/>

  )
}

export default SignUpScreen
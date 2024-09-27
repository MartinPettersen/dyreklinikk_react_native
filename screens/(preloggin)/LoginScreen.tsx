import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginPage from "../../components/(preloggin)/LoginPage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  return (
    <LoginPage navigation={navigation}/>
  );
};


export default LoginScreen;

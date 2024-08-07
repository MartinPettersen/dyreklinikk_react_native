import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginPage from "../../components/(preloggin)/LoginPage";

const LoginScreen = ({navigation}: any) => {
  return (
    <LoginPage navigation={navigation}/>
  );
};


export default LoginScreen;

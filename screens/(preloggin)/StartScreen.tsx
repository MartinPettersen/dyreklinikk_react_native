import React from 'react'
import Startpage from '../../components/(preloggin)/Startpage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type StartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
};

const StartScreen = ({navigation}: StartScreenProps) => {
  return (
    <Startpage navigation={navigation} />
  )
}

export default StartScreen
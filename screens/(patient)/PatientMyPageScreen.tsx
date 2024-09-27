import React from 'react'
import PatientMyPage from '../../components/(patient)/PatientMyPage'
import { useUser } from "../../components/(user)/UserContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

type PatientMyPageScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyPage'>;
};
const PatientMyPageScreen = ({navigation}: PatientMyPageScreenProps) => {
    const { user } = useUser();
  
  return (
    <PatientMyPage navigation={navigation} user={user} />
)
}

export default PatientMyPageScreen
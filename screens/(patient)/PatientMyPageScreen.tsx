import React from 'react'
import PatientMyPage from '../../components/(patient)/PatientMyPage'
import { useUser } from "../../components/(user)/UserContext";

const PatientMyPageScreen = ({navigation}: any) => {
    const { user } = useUser();
    console.log("user",user)
  
  return (
    <PatientMyPage navigation={navigation} user={user} />
)
}

export default PatientMyPageScreen
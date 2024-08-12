import React from 'react'
import { View } from 'react-native'
import { useUser } from "../../components/(user)/UserContext";

const EmployeeInfoScreen = () => {
  
  const { user } = useUser();

  return (
    <View></View>
  )
}

export default EmployeeInfoScreen
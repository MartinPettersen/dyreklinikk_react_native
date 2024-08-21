import React from 'react'
import { View } from 'react-native'
import CoworkerPage from '../../components/(employee)/CoworkerPage'

const CoworkerScreen = ({navigation, route}: any) => {

  const { employee } = route.params

  return (
    <CoworkerPage navigation={navigation} employee={employee}/>
  )
}

export default CoworkerScreen
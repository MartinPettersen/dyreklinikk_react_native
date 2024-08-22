import React from 'react'
import { View } from 'react-native'
import AddPatientPage from '../../components/(employee)/AddPatientPage'

const AddPatientScreen = ({navigation, route}: any) => {

  const {patients} = route.params

  return (
    <AddPatientPage navigation={navigation} patients={patients}/>
  )
}

export default AddPatientScreen
import React from 'react'
import VetClinicPage from '../../components/(employee)/VetClinicPage'

const VetClinicScreen = ({navigation, route}: any) => {

    const { clinic } = route.params

  return (
    <VetClinicPage navigation={navigation} clinic={clinic}/>
  )
}

export default VetClinicScreen
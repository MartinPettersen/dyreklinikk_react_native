import React from 'react'
import ClinicPage from '../../components/(universal)/ClinicPage';

const ClinicScreen = ({navigation, route}: any) => {
  
  const { clinic } = route.params; 

  return (
    <ClinicPage clinic={clinic} navigation={navigation} />
  )
}

export default ClinicScreen
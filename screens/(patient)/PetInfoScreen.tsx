import React from 'react'
import PetInfoPage from '../../components/(patient)/PetInfoPage'

const PetInfoScreen = ({navigation, route}: any) => {

    const { pet } = route.params; 


  return (
    <PetInfoPage pet={pet}/>
  )
}

export default PetInfoScreen
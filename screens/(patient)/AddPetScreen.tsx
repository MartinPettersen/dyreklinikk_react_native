import React from 'react'
import { useUser } from "../../components/(user)/UserContext";
import AddPetPage from '../../components/(patient)/AddPetPage';

const AddPetScreen = ({navigation, route}: any) => {
    const { ownerId } = route.params; 
  return (
    <AddPetPage navigation={navigation} ownerId={ownerId} />
  )
}

export default AddPetScreen
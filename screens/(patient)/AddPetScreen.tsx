import React from 'react'
import { useUser } from "../../components/(user)/UserContext";
import AddPetPage from '../../components/(patient)/AddPetPage';

const AddPetScreen = ({navigation}: any) => {
    const { user } = useUser();
  return (
    <AddPetPage navigation={navigation} user={user} />
  )
}

export default AddPetScreen
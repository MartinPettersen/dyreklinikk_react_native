import React from 'react'
import AddOwnerInfo from '../../components/(patient)/AddOwnerInfo'
import { useUser } from "../../components/(user)/UserContext";

const AddOwnerInfoScreen = ({navigation}: any) => {
    const { user } = useUser();

  return (
    <AddOwnerInfo navigation={navigation} email={user?.email}/>
  )
}

export default AddOwnerInfoScreen
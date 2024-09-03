import React from 'react'
import EmployeeInfoPage from '../../components/(admin)/EmployeeInfoPage'
import { useUser } from "../../components/(user)/UserContext";

const AdminEmployeeScreen = ({navigation, route}: any) => {
  
    const { employee } = route.params;
    const { user } = useUser();
  
    return (
    <EmployeeInfoPage employee={employee} navigation={navigation} user={user}/>
  )
}

export default AdminEmployeeScreen
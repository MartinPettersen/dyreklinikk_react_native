import React from 'react'
import EmployeeInfoPage from '../../components/(admin)/EmployeeInfoPage'

const AdminEmployeeScreen = ({navigation, route}: any) => {
  
    const { employee } = route.params;
  
    return (
    <EmployeeInfoPage employee={employee} navigation={navigation} />
  )
}

export default AdminEmployeeScreen
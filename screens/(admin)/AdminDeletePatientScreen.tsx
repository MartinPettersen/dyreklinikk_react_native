import React from 'react'
import AdminDeletePatientPage from '../../components/(admin)/AdminDeletePatientPage';

const AdminDeletePatientScreen = ({navigation, route}: any) => {

    const { deleteRequest } = route.params;
  return (
    <AdminDeletePatientPage navigation={navigation} deleteRequest={deleteRequest}/>
  )
}

export default AdminDeletePatientScreen
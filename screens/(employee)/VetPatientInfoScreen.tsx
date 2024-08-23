import React from 'react'
import PatientInfoPage from '../../components/(employee)/PatientInfoPage'


const VetPatientInfoScreen = ({navigation, route}: any) => {
  
    const {  owner, patient, user } = route.params; 
    return (
    <PatientInfoPage navigation={navigation} owner={owner} patient={patient} user={user}/>
  )
}

export default VetPatientInfoScreen
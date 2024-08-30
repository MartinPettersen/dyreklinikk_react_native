import React from 'react'
import PatientInfoPage from '../../components/(employee)/PatientInfoPage'
import CoworkerPatientInfoPage from '../../components/(employee)/CoworkerPatientInfoPage';


const VetPatientInfoScreen = ({navigation, route}: any) => {
  
    const {  owner, patient, user } = route.params; 
    return (
    <CoworkerPatientInfoPage navigation={navigation} owner={owner} patient={patient} user={user}/>
  )
}

export default VetPatientInfoScreen
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DeleteButton from '../(util)/DeleteButton'
import BasicButton from '../(util)/BasicButton'
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'

type Props = {
    navigation: any,
    deleteRequest: any,
    clinic: any,
    owner: any,
    vet: any,
    openDeletefield: boolean,
    setOpenDeleteField: React.Dispatch<React.SetStateAction<boolean>>,
}

const AdminDeleteCheck = ({navigation, deleteRequest, clinic,owner, vet, openDeletefield, setOpenDeleteField}: Props) => {

    const deletePatient = async () => {

        //console.log("deleteRequest", deleteRequest)
        //console.log("clinic", clinic)
        //console.log("owner", owner)
        //console.log("vet", vet )

        
        const vetRef = doc(FIRESTORE_DB, `employees/${vet.id}`);
        await updateDoc(vetRef, {
          patients: vet.patients.filter((patient: any) => patient.ownerId !== deleteRequest.patient.ownerId || 
          patient.patient !== deleteRequest.patient.patient)
        });


        
        const clinicRef = doc(FIRESTORE_DB, `clinics/${clinic.id}`);
        await updateDoc(clinicRef, {
          patients: clinic.patients.filter((patient: any) => patient.ownerId !== deleteRequest.patient.ownerId || 
          patient.patient !== deleteRequest.patient.patient)
        });

        

        //console.log("patient to be removed", deleteRequest.patient)
        //console.log("unfiltered patients", clinic.patients.length)
        //console.log("filtered patients",clinic.patients.filter((patient: any) => patient.ownerId !== deleteRequest.patient.ownerId || 
        //patient.patient !== deleteRequest.patient.patient).length)

        const docRef = doc(FIRESTORE_DB, `deleterequest/${deleteRequest.id}`);
        deleteDoc(docRef);
        navigation.navigate("AdminDeletePatients");
      };

  return (
    <View>
                  <Text style={styles.headline}>
            Sikker på at du ønskter å slette pasienten?
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <DeleteButton
                label={"Slett"}
                action={() => deletePatient()}
                disabled={false}
              />
            </View>

            <View style={styles.buttonView}>
              <BasicButton
                label="Kansler"
                action={() => setOpenDeleteField(false)}
                disabled={false}
              />
            </View>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputField: {
      padding: 10,
      paddingBottom: 2,
      paddingTop: 12,
      borderRadius: 10,
      borderWidth: 1,
      margin: 10,
      backgroundColor: "white",
      width: "60%",
      fontSize: 16,
    },
    headline: {
      fontSize: 40,
      margin: 20,
      color: "#52525b",
      fontWeight: "bold",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    fieldContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    buttonView: {
      padding: 18,
    },
    text: {
      fontSize: 20,
      color: "#52525b",
      margin: 3,
    },
    bold: {
      fontWeight: "bold",
    },
  });

export default AdminDeleteCheck
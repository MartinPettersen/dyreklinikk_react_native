import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DeleteButton from "../(util)/DeleteButton";
import BasicButton from "../(util)/BasicButton";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import AdminDeleteCheck from "./AdminDeleteCheck";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  deleteRequest: any;
};

const AdminDeletePatientPage = ({ navigation, deleteRequest }: Props) => {
  const [openDeleteField, setOpenDeleteField] = useState<boolean>(false);

  const [owner, setOwner] = useState<any | null>(null);
  const [clinic, setClinic] = useState<any | null>(null);
  const [vet, setVet] = useState<any | null>(null);

  const getOwner = async () => {
    const docRef = doc(FIRESTORE_DB, `owners/${deleteRequest.owner}`);

    const subscriber = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setOwner(snapshot.data());
      } else {
        setOwner(null);
      }
    });
  };

  const getClinic = async () => {
    const clinicRef = collection(FIRESTORE_DB, `clinics`);

    const subscriber = onSnapshot(
      query(clinicRef, where("patients", "array-contains", deleteRequest.patient)),
      {
        next: (snapshot) => {
          const clinics: any[] = [];
          snapshot.docs.forEach((doc) => {
            clinics.push({
              patients: doc.data().patients,
              id: doc.id,
              name: doc.data().name
            });
          });
          setClinic(clinics[0]);
        },
      }
    );
  };


  const getVet = () => {
    const vetRef = collection(FIRESTORE_DB, "employees");
    const subscriber = onSnapshot(
      query(vetRef, where("email", "==", deleteRequest.requestedBy)),
      {
        next: (snapshot) => {
          const vets: any[] = [];
          snapshot.docs.forEach((doc) => {
            vets.push({
              patients: doc.data().patients,
              id: doc.id,
            });
          });
          setVet(vets[0]);
        },
      }
    );
  };

  useEffect(() => {
    getClinic();
  }, [owner]);

  useEffect(() => {
    getOwner();
  }, []);

  useEffect(() => {
    getVet();
  }, []);

  const deletePatient = () => {
    const docRef = doc(FIRESTORE_DB, `deleterequest/${deleteRequest.id}`);
    deleteDoc(docRef);
    navigation.navigate("AdminDeletePatients");
  };

  return (
    <View style={styles.container}>
      {openDeleteField ? (
          <AdminDeleteCheck navigation={navigation} vet={vet} clinic={clinic} deleteRequest={deleteRequest} openDeletefield={openDeleteField} setOpenDeleteField={setOpenDeleteField} owner={owner}/>
      ) : (
        <>
          <View>
            {owner && clinic ? (
              <View>
                <Text style={styles.text}>
                  <Text style={[styles.text, styles.bold]}>Pasient:</Text>{" "}
                  {owner.pets[deleteRequest.patient.patient].name}
                </Text>
                
                <Text style={styles.text}>
                  <Text style={[styles.text, styles.bold]}>Klinikk:</Text>{" "}
                  {clinic.name}
                </Text>
                <Text style={styles.text}>
                  <Text style={[styles.text, styles.bold]}>Eier:</Text>{" "}
                  {owner.name}
                </Text>
                <Text style={styles.text}>
                  <Text style={[styles.text, styles.bold]}>Begrunnelse:</Text>{" "}
                  {deleteRequest.reason}
                </Text>
                <Text style={styles.text}>
                  <Text style={[styles.text, styles.bold]}>Sent av:</Text>{" "}
                  {deleteRequest.requestedBy}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ margin: 60 }}>
            <DeleteButton
              label={"Slett Pasient"}
              action={() => setOpenDeleteField(true)}
              disabled={false}
            />
          </View>
        </>
      )}
    </View>
  );
};
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

export default AdminDeletePatientPage;

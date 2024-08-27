import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import HorizontalLine from "../(util)/HorizontalLine";
import DeleteButton from "../(util)/DeleteButton";
import BasicButton from "../(util)/BasicButton";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  owner: any;
  patient: any;
  user: any;
};

const VetDeletePatient = ({ owner, patient, user }: Props) => {
  const [openDeleteField, setOpenDeleteField] = useState<boolean>(false);

  const [deleteReason, setDeleteReason] = useState<string>("");

  const deletePatient = () => {
    console.log("owner", owner.pets[patient.patient].owner);
    console.log("patient", patient);
    console.log("user.email", user.email);
    console.log("reason", deleteReason)
    const doc = addDoc(collection(FIRESTORE_DB, "deleterequest"), {
        owner: owner.pets[patient.patient].owner,
        patient: patient,
        requestedBy: user.email,
        reason: deleteReason
    })
    setOpenDeleteField(false)
  };

  return (
    <View>
      <HorizontalLine />
      {openDeleteField? 
      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Begrunnelse for sletting"
          onChangeText={(text: string) => setDeleteReason(text)}
          value={deleteReason}
          style={styles.inputField}
          />
        <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>

          <DeleteButton
            label={"Delete"}
            action={() => deletePatient()}
            disabled={deleteReason == ""}
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
        :

      <View style={{ margin: 60 }}>
        <DeleteButton
          label={"Be om sletting"}
          action={() => setOpenDeleteField(true)}
          disabled={false}
          />
      </View>
        }
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
    justifyContent: "space-between"
  },
  fieldContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    padding: 18,
  }

});

export default VetDeletePatient;

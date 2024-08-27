import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DeleteButton from "../(util)/DeleteButton";
import BasicButton from "../(util)/BasicButton";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  navigation: any;
  deleteRequest: any;
};

const AdminDeletePatientPage = ({ navigation, deleteRequest }: Props) => {
  console.log("deleteRequest", deleteRequest);
  const [openDeleteField, setOpenDeleteField] = useState<boolean>(false);


  const [owner, setOwner] = useState<any | null>(null);

  const getPatients = async () => {
    const docRef = doc(FIRESTORE_DB, `owners/${deleteRequest.owner}`);

    const subscriber = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("owner", snapshot.data())
        setOwner(snapshot.data());
      } else {
        console.log("Problem with fetching documents");
        setOwner(null);
      }
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  const deletePatient = () => {
    const docRef = doc(FIRESTORE_DB, `deleterequest/${deleteRequest.id}`);
    deleteDoc(docRef);
    navigation.navigate("AdminDeletePatients");
  };

  return (
    <View>
        <View>
            {owner?
                <View>
                    <Text>{owner.name}</Text>

                </View>
        :null}

        </View>

      {openDeleteField ? (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            <DeleteButton
              label={"Delete"}
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
      ) : (
        <View style={{ margin: 60 }}>
          <DeleteButton
            label={"Slett Pasient"}
            action={() => setOpenDeleteField(true)}
            disabled={false}
          />
        </View>
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
});

export default AdminDeletePatientPage;

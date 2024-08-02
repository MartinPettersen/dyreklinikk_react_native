import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";

const AddClinicPage = () => {
  const addClinic = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "clinics"), {
      navn: "Best Dog Carl Berner",
    });
  };

  return (
    <View>
      <Text>Legg til ny Klinikk</Text>

      <View style={{ width: "60%" }}>
        <BasicButton label={"Legg Til"} action={() => addClinic()} />
      </View>
    </View>
  );
};

export default AddClinicPage;

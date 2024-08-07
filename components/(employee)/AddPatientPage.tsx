import React, { useState } from "react";
import { View } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  navigation: any;
};

type Owner = {
    name: string,
    email: string,
    phone: string,
    adress: string,
}

type Treatment = {
    patient: string,
    meetUp: boolean,
    date: string,
}

const AddPatientPage = ({ navigation }: Props) => {
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [race, setRace] = useState<string>();
  const [species, setSpecies] = useState<string>();

  const [treatments, setTreatments] = useState<string>();



  return <View></View>;
};

export default AddPatientPage;

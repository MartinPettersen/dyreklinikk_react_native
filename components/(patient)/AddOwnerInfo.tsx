import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import BasicButton from '../(util)/BasicButton';

type Props = {
    navigation: any,
    email: string | null | undefined,
}

const AddOwnerInfo = ({navigation, email}: Props) => {
  const [name, setName] = useState<string>();
  const [adress, setAdress] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [pets, setPets] = useState<string[]>([])

  const addOwner = async () => {
    const docRef = await addDoc(collection(FIRESTORE_DB, "owners"), {
      name: name,
      adress: adress,
      email: email,
      phone: phone,
      pets: pets,
    })

  }


  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Kontakt Informajson</Text>
      <TextInput
        placeholder="Navn"
        onChangeText={(text: string) => setName(text)}
        value={name}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Adresse"
        onChangeText={(text: string) => setAdress(text)}
        value={adress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Telefon"
        onChangeText={(text: string) => setPhone(text)}
        value={phone}
        style={styles.inputField}
      />
      <View style={{ width: "60%", paddingTop: 10, zIndex: 1 }}>
        <BasicButton
          label={"Legg Til"}
          action={() => addOwner()}
          disabled={name === ""}
        />
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
  timerText: {
    fontSize: 20,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
  dropdownContainer:{ 
    width: "30%",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});


export default AddOwnerInfo
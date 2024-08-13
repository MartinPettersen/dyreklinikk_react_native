import React, { useEffect, useState } from 'react'
import { Clinic } from '../../utils/types'
import { Text, TextInput, View, StyleSheet } from 'react-native';
import PetDropDownMenu from '../(util)/PetDropDownMenu';
import BasicButton from '../(util)/BasicButton';

type Props = {
    clinic: Clinic,
    vet: any,
    navigation: any,
    date: string,
    time: any,
    owner: any 
}

const BookingPage = ({clinic, vet, date, time, owner}: Props) => {

    const [pet, setPet ] = useState<any | null>(null)
    const [reason, setReason] = useState<string>("")
    const [pets, setPets] = useState<any[]>([])
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        console.log(owner)
        if(owner){
            setPets(owner.pets)
        }
    },[owner])

  return (
    <View style={styles.container}>
        <Text>{`Time hos ${vet} ved ${clinic.name} den ${date} klokken ${time}`}</Text>

        <View style={[styles.dropdownContainer, , {zIndex: 3}]}>
        <PetDropDownMenu
          open={open}
          setOpen={setOpen}
          pet={pet}
          setPet={setPet}
          pets={pets}
          setPets={setPets}
        />
      </View>

        <Text>Beskriv kort grunnen for besøket</Text>
        <TextInput         
        placeholder="Grunnen for besøket"
        onChangeText={(text: string) => setReason(text)}
        value={reason}
        style={styles.inputField}/>

        <BasicButton label="Bestil Time" action={() => console.log("besitller")} disabled={reason == "" || pet == null}/>
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

export default BookingPage
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Clinic } from '../../utils/types'

type Props = {
    clinic: Clinic,
    navigation: any,
}

const ClinicPage = ({clinic, navigation}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.headline}>{`${clinic.name}`}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Adresse: </Text>{clinic.adress}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Åpningstider: </Text>{`${clinic.openingHour}-${clinic.closingHour}`}</Text>
        <Text style={styles.text}><Text style={styles.bold}></Text></Text>
        <Text style={styles.text}><Text style={styles.bold}></Text></Text>
        <Text style={styles.text}><Text style={styles.bold}></Text></Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headline: {
      fontSize: 40,
      margin: 20,
      color: "#52525b",
      fontWeight: "bold",
    },
    buttonContainer: {
      margin: 10,
      width: "50%",
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

export default ClinicPage
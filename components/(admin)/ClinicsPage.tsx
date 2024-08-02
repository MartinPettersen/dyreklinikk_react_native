import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View ,StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import BasicButton from "../(util)/BasicButton";

type Props = {
    navigation: any
}

const ClinicsPage = ({navigation}: Props) => {

    
    

  return (
    <View style={styles.container}>
      <Text>Klinikker:</Text>
      <View>

      </View>
      <BasicButton label={"Ny Klinikk"} action={() => navigation.navigate('AddClinic')}/>

    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default ClinicsPage;

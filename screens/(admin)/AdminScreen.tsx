import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BasicButton from "../../components/(util)/BasicButton";

const AdminScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>AdminScreen</Text>
      <BasicButton label={"Klinikker"} action={() => navigation.navigate('Clinics')} disabled={false}/>

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

export default AdminScreen;

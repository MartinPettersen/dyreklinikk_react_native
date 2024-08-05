import React from 'react'
import { View, StyleSheet } from 'react-native'

const HorizontalLine = () => {
  return (
    <View style={styles.line}></View>
  )
}

const styles = StyleSheet.create({
    line: {
        borderTopWidth: 1,
        borderColor: "#52525b",
        width: "100%",
        marginTop: 20,
    }
})

export default HorizontalLine
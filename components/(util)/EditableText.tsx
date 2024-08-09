import React, { useState } from 'react'
import IconButton from './IconButton'
import { TextInput, View, StyleSheet, Text } from 'react-native'

type Props = {
    editableText: string,
    setEditableText: React.Dispatch<React.SetStateAction<string>>,
    label: string,

}

const EditableText = ({editableText, setEditableText, label}: Props) => {

    const [editing, setEditing] = useState(false)

  return (
    <View style={styles.sideButton}>
        {editing ? (
          <TextInput
            placeholder={label}
            onChangeText={(text: string) => setEditableText(text)}
            value={editableText}
            style={styles.inputField}
          />
        ) : (
          <Text>{label}</Text>
        )}

        <IconButton
          label={"edit"}
          action={() => setEditing(!editing)}
          disabled={false}
        />
      </View>
  )
}


const styles = StyleSheet.create({
    sideButton: {
      flexDirection: "row",
      margin: 10,
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
  });

export default EditableText
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import DeleteRequestTag from "./DeleteRequestTag";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

type RenderRequestProp = {
  item: any
}

const AdminDeletePatientsPage = ({navigation}: Props) => {
  const [deleteRequests, setDeleteRequests] = useState<any[] | null>(null);

  const getRequests = () => {
    const docRef = collection(FIRESTORE_DB, "deleterequest");
    const subscriber = onSnapshot(docRef, {
      next: (snapshot) => {
        const deleteRequestsList: any[] = [];
        snapshot.docs.forEach((doc) => {
          deleteRequestsList.push({
            id: doc.id,
            ...doc.data(),
          } as any);
        });
        setDeleteRequests(deleteRequestsList);
      },
    });
    return () => subscriber();
  };

  useEffect(() => {
    getRequests();
  }, []);

  const renderRequest = ({item }: RenderRequestProp) => {
    return <DeleteRequestTag request={item} action={() => navigation.navigate("AdminDeletePatient", {deleteRequest: item})}/>
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Henvendelser for sletting av pasienter</Text>
      {deleteRequests ? 
      (
        <View style={styles.requestContainer}>
          {
            <FlatList
              data={deleteRequests}
              renderItem={renderRequest}
              keyExtractor={(request: any) => request.id}
            />
          }
        </View>
      )  : null}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  requestContainer: {
    margin: 0,
  },
  headline: {
    fontSize: 30,
    margin: 20,
    color: "#52525b",
    fontWeight: "bold",
  },
});


export default AdminDeletePatientsPage;

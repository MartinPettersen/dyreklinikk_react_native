import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOwner: string | null;
  setSelectedOwner: React.Dispatch<React.SetStateAction<string | null>>;
  patients: any[];
};

const VetOwnerDropDown = ({
  open,
  setOpen,
  setSelectedOwner,
  selectedOwner,
  patients
}: Props) => {

    const [ownerList, setOwnerList] = useState<any[]>([])

    const getOwner = async (ownerId: string) => {
        try {
          const docRef = doc(FIRESTORE_DB, `owners/${ownerId}`);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            return snapshot.data();
          } else {
            console.log("Document not found:", ownerId);
            return null;
          }
        } catch (error) {
          console.log("Error fetching owner:", error);
          return null;
        }
      };


  const makeOwnerList = async () => {
    const ownerListTemp = []
    for (let i = 0; i < patients.length; i++) {
        const ownerTemp = await getOwner(patients[i].ownerId)
        ownerListTemp.push({label: ownerTemp!.name, value: patients[i].ownerId})
    }
    setOwnerList(ownerListTemp)
  } 

  useEffect(() => {
    makeOwnerList()
  },[])

  return <View style={{zIndex: 3, width: "60%"}}>
        {ownerList.length > 0? 
        
        <DropDownPicker
          open={open}
          value={selectedOwner}
          items={ownerList}
          setOpen={setOpen}
          setValue={setSelectedOwner}
          setItems={setOwnerList}
          style={{}}
          placeholder={"Velg Eier"}
        />
        :null}
    </View>;
};

export default VetOwnerDropDown;

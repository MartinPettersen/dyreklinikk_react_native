import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pets: any[];
  setPets: React.Dispatch<React.SetStateAction<any[]>>;
  pet: string | null;
  setPet: React.Dispatch<React.SetStateAction<string | null>>;
};

const PetDropDownMenu = ({
  open,
  setOpen,
  pets,
  setPets,
  pet,
  setPet,
}: Props) => {
  const [petNames, setPetNames] = useState<{ label: string; value: any }[]>(
    []
  );

  const getPetNames = () => {
    const petNameList = [];
    for (let i = 0; i < pets.length; i++) {
      petNameList.push({
        label: pets[i].name,
        value: {pet: pets[i], petIndex: i},
      });
    }
    setPetNames(petNameList)
  };

  useEffect(() => {
    getPetNames();
  }, [pets]);

  return (
    <View style={{}}>
      {petNames.length > 0 ? (
        <DropDownPicker
          open={open}
          value={pet}
          items={petNames}
          setOpen={setOpen}
          setValue={setPet}
          setItems={setPets}
          style={{}}
          placeholder={"Velg dyr"}
        />
      ) : null}
    </View>
  );
};

export default PetDropDownMenu;

import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Pet } from "../../utils/types";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  pet: number | null;
  setPet: React.Dispatch<React.SetStateAction<number | null>>;
};

const PetDropDownMenu = ({
  open,
  setOpen,
  pets,
  setPets,
  pet,
  setPet,
}: Props) => {
  console.log("pets", pets);
  console.log("pet", pet);

  const [petNames, setPetNames] = useState<
    { label: string; value:  number  }[]
  >([]);
  const getPetNames = () => {
    const petNameList = [];
    for (let i = 0; i < pets.length; i++) {
      const val = { pet: pets[i], petIndex: i };
      console.log("val", val);
      petNameList.push({
        label: pets[i].name,
        value:  i ,
      });
    }
    setPetNames(petNameList);
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

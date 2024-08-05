import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTime: string | null,
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
}

const DropDownMenu = ({open, setOpen, setSelectedTime, selectedTime}: Props) => {


    const [times, setTimes] = useState<{label: string, value: string}[]>([]);

  const intervals = 15;

  const getTimes = () => {
    const tempTimes = [];

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        let hour;
        let minute;

        if (i < 10) {
          hour = "0" + i;
        } else {
          hour = i;
        }
        if (j < 1) {
          minute = "0" + j * intervals;
        } else {
          minute = j * intervals;
        }
        tempTimes.push({label: `${hour}:${minute}`, value: `${hour}:${minute}`});
      }
    }
    setTimes(tempTimes);
  };

  useEffect(() => {
    getTimes();
  }, []);

  return <View style={{}}>
  {times.length > 0 ? 
    <DropDownPicker
        open={open}
        value={selectedTime}
        items={times}
        setOpen={setOpen}
        setValue={setSelectedTime}
        setItems={setTimes}
        style={{}}
        placeholder={selectedTime!}
      /> 
  : null}</View>;
};

export default DropDownMenu;

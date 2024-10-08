import React, { useEffect, useState } from 'react'
import BookingPage from '../../components/(patient)/BookingPage'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useUser } from "../../components/(user)/UserContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Owner, RootStackParamList } from '../../utils/types';
import { RouteProp } from '@react-navigation/native';

type BookingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Booking'>;
  route: RouteProp<RootStackParamList, 'Booking'>;
};

type OwnerWithId = Owner & { id: string}

const BookingScreen: React.FC<BookingScreenProps> = ({navigation, route}) =>  {
    const { vet, clinic, date, time } = route.params; 
    const { user } = useUser();
  
    const [owner, setOwner] = useState<Owner | null>()  
  
    const getOwner = () => {
        const ownerRef = collection(FIRESTORE_DB, "owners");
        const subscriber = onSnapshot(
            query(ownerRef, where("email", "==", user!.email)),
            {
                next: (snapshot) => {
                    const owners: OwnerWithId[] = [];
                    snapshot.docs.forEach((doc) => {
                        owners.push({
                            adress: doc.data().adress,
                            email: doc.data().email,
                            name: doc.data().name,
                            pets: doc.data().pets,
                            phone: doc.data().phone,
                            id: doc.id,
                        })
                    })
                    setOwner(owners[0])
                }
            }
        )
    }

    useEffect(() => {
        getOwner();
    }, [])

    return (
    <BookingPage navigation={navigation} vet={vet} clinic={clinic} date={date} time={time} owner={owner}/>
  )
}

export default BookingScreen
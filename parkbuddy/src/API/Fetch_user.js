import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "./firestore";

let userName = 'User1@gmail.com';

let FUser = { "hii": "dsad" };

export async function fetchData() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Car_Parks'));
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const data = dataArray[0];

        FUser = {
            "Car_park_name": dataArray[0].Car_park_name,
            "User_name": dataArray[0].User_name,
            "num_of_lots": dataArray[0].num_of_lots,
            UserLots: {}
        }



        const mainDocRef = doc(db, 'Car_Parks', userName);

        // Reference to the sub-collection
        const subCollectionRef = collection(mainDocRef, 'UserLots');

        // Fetch documents from the sub-collection
        const querySnapshot2 = await getDocs(subCollectionRef);
        const dataArray2 = querySnapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log("Infoee: ",dataArray2);

        await dataArray2.forEach(async (lot_key) => {
            const mainDocRef2 = doc(db, 'Car_Parks/User1@gmail.com/UserLots', lot_key.name);
            const subCollectionRef2 = collection(mainDocRef2, 'lot_events');
            const querySnapshot3 = await getDocs(subCollectionRef2);
            const dataArray3 = querySnapshot3.docs.map(doc => ({ id: doc.id, ...doc.data() }));


            FUser.UserLots[lot_key.name] = {
                "name": lot_key.name,
                "lot_events": dataArray3.map(event => ({
                    "title": event.title,
                    "start": event.start,
                    "end": event.end,
                    "Vehicle": event.Vehicle,
                    "Vehicle_number": event.Vehicle_number,
                }))
            }

            
            // console.log("Array 3 :: ", dataArray3);
        })
        console.log("Final FUSER :: ", FUser);
        return FUser;






        

    } catch (error) {
        console.error("Error fetching data: ", error);
    }

}




import axios from "axios";
import {database} from "..//API/firebase_auth";
import { collection, getDocs ,doc,getDoc,addDoc} from "firebase/firestore";


// export async function fetchUser(User_email) {
//     console.log("Fetching user...",User_email);

//     try {
//         const response = await axios.get('http://localhost:8000/User/' + User_email);

//         User=response.data;
//         // console.log("Response: ",User);
//         // console.log("Check: ",User.UserLots.Lot_1.lot_events[0].start);

//         return User;


//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }

// export async function fetchUser(User_email) {
//     console.log("Fetching user...", User_email);

//     try {
//         const querySnapshot = await getDocs(collection(database, "Car_Parks"));
//         const userDoc=querySnapshot.docs.find(doc => doc.id == User_email);

//         if (userDoc) {
//             const userData = { id: userDoc.id, ...userDoc.data() };
//             console.log("Userfrom fetch back :", userData);
//             return userData;
//             // Set the user data to state
//         } else {
//             console.log("User not found");
//         }


//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }

export async function fetchUser(Usermail) {
    try {
        // Fetch main user data
        const userDocRef = doc(collection(database, "Car_Parks"), Usermail);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = {
                User_id: userDoc.id,
                User_name: userDoc.data().User_name,
                Car_park_name: userDoc.data().Car_park_name,
                num_of_lots: userDoc.data().num_of_lots,
                UserLots: {},
            };

            // Fetch UserLots collection
            const userLotsCollectionRef = collection(userDocRef, "UserLots");
            const userLotsSnapshot = await getDocs(userLotsCollectionRef);
            
            // Add UserLots to the user object
            userLotsSnapshot.forEach(doc => {
                userData.UserLots[doc.id] = doc.data();
            });

            // Fetch lot_events for each UserLot
            for (const lotName in userData.UserLots) {
                const lotDocRef = doc(userLotsCollectionRef, lotName);
                const lotEventsCollectionRef = collection(lotDocRef, "lot_events");
                const lotEventsSnapshot = await getDocs(lotEventsCollectionRef);
                
                userData.UserLots[lotName].lot_events = lotEventsSnapshot.docs.map(doc => doc.data());
            }

            return userData;
        } else {
            console.log("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw new Error("Error fetching data");
    }
}

export async function fetchParklot(lotid,User_id) {
    console.log("Fetching parklot...");
    try {
        const response = await axios.get('http://localhost:8000/Parklot/'+User_id + '/' + lotid);

        let park_lot = response.data;
        console.log("Response: ", park_lot);

        return park_lot;


    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// export async function Add_newevent(Parklot_id, User_id, eventdata) {
//     // console.log("Fetching user...");
//     try {
//         const response = await axios.post('http://localhost:8000/Add_event/' + User_id + '/' + Parklot_id, eventdata);



//     }
//     catch (error) {
//         console.error("Error Sending data: ", error);
//     }
// }

export async function Check_events(User_id,event_data) {
    try {
        const response = await axios.post('http://localhost:8000/Check_events/'+User_id,event_data);
    }
    catch (error) {
        console.error("Error Sending data: ", error);
    }
}

export async function Add_newevent(Lot_id,User_id, event_data) {
    
    try {
        // Reference to the lot_events collection
        const lotEventsCollectionRef = collection(
            doc(collection(database, "Car_Parks"), User_id),
            "UserLots",
            Lot_id,
            "lot_events"
        );
        console.log("Adding: ", event_data);

        // Add event to the collection
        const response = await addDoc(lotEventsCollectionRef, event_data);
        
        console.log("Event added with ID: ", response.id);
    } catch (error) {
        console.error("Error adding event: ", error);
        throw new Error("Error adding event");
    }
}


export async function Create_user(User_email, User_name, Car_park_name, Car_park_address, Num_car_park_slots) {
    let User_info = {
        User_email: User_email,
        User_name: User_name,
        Car_park_name: Car_park_name,
        Car_park_address: Car_park_address,
        Num_car_park_slots: Num_car_park_slots
    }
    try {
        const response = await axios.post('http://localhost:8000/Add_User', User_info);

    } catch (error) {

    }

}




import axios from "axios";
import { database } from "..//API/firebase_auth";
import { collection, getDocs, doc, onSnapshot, getDoc, addDoc, setDoc, updateDoc } from "firebase/firestore";


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

export async function addEventToHistory(eventData, Usermail) {
    console.warn("Adding event to history22", eventData);

    const docRef = doc(database, "Car_Parks", Usermail, 'History', eventData.date); // Reference to the document named after the relevant date
    console.warn("Adding event to history in fetch backend", docRef);

    try {
        // Check if the document already exists
        const docSnap = await getDoc(docRef);
        console.log("Adding data to history:::");
        if (docSnap.exists()) {
            // If the document exists, update it by adding a new event (using a unique event ID, like timestamp or vehicle number)
            const newEventKey = `${eventData.vehicle_number}_${eventData.parklot_id}`; // A unique key based on vehicle number and current timestamp
            await updateDoc(docRef, {
                [newEventKey]: eventData, // Add the new event under a unique key
            });
        } else {
            // If the document does not exist, create it with the new event
            await setDoc(docRef, {
                [`${eventData.vehicle_number}_${eventData.parklot_id}`]: eventData, // Use a unique key for the event
            });
        }

        console.log('Event added successfully!');
    } catch (error) {
        console.error('Error adding event: ', error);
    }
};

//retrieve event from history
export async function getHistoryEvents(User_email) {
    try {
        // Get all documents in the "history" collection
        const querySnapshot = await getDocs(collection(database, 'Car_Parks', User_email, 'History'));

        // Initialize an empty object to store the formatted result
        const historyEvents = {};

        querySnapshot.forEach((doc) => {
            // doc.id is the date (e.g., "2024-10-02")
            const date = doc.id;
            // doc.data() is an object containing events for that date
            const events = doc.data();

            // Store the events under the date key
            historyEvents[date] = events;
        });

        console.log("Fetch backend:", historyEvents); // { '2024-10-02': { events }, ... }
        return historyEvents;

    } catch (error) {
        console.error('Error retrieving history events: ', error);
    }
};


export async function fetchCarpark_name(Usermail) {
    try {
        const userDocRef = doc(collection(database, "Car_Parks"), Usermail);
        const userDoc = await getDoc(userDocRef);

        let car_park = userDoc.data().Car_park_name;
        let User_name = userDoc.data().User_name;

        let data = {
            'email': Usermail,
            "car_park": car_park,
            "user_name": User_name
        }
        console.warn("Retrieve data for menu: ", data);
        return data;


    } catch (error) {

        console.error("Error fetching car park name");


    }

}
export function fetchUserRealTime(Usermail, onUserDataChange) {
    // Check if Usermail is valid before proceeding
    if (!Usermail) {
        console.error("Usermail is empty or undefined.");
        onUserDataChange(null);
        // Return a no-op cleanup function if Usermail is invalid
        return () => { };
    }

    try {
        // Listen to real-time updates for the main user document
        const userDocRef = doc(collection(database, "Car_Parks"), Usermail);
        const unsubscribeUserDoc = onSnapshot(userDocRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = {
                    User_id: userDoc.id,
                    User_name: userDoc.data().User_name,
                    Car_park_name: userDoc.data().Car_park_name,
                    num_of_lots: userDoc.data().num_of_lots,
                    UserLots: {},
                };

                // Listen for real-time updates in the "UserLots" collection
                const userLotsCollectionRef = collection(userDocRef, "UserLots");
                const unsubscribeUserLots = onSnapshot(userLotsCollectionRef, (userLotsSnapshot) => {
                    userLotsSnapshot.forEach((doc) => {
                        userData.UserLots[doc.id] = doc.data();
                    });

                    // Fetch and listen for real-time updates in "lot_events" for each UserLot
                    for (const lotName in userData.UserLots) {
                        const lotDocRef = doc(userLotsCollectionRef, lotName);
                        const lotEventsCollectionRef = collection(lotDocRef, "lot_events");
                        onSnapshot(lotEventsCollectionRef, (lotEventsSnapshot) => {
                            userData.UserLots[lotName].lot_events = lotEventsSnapshot.docs.map((doc) => {
                                return {
                                    id: doc.id,
                                    ...doc.data()
                                }
                            }
                            );
                        });
                    }

                    // Pass the updated user data to the callback
                    onUserDataChange(userData);
                });

                // Return both unsubscribe functions to stop listening when no longer needed
                return () => {
                    unsubscribeUserDoc(); // Unsubscribe from user doc
                    unsubscribeUserLots(); // Unsubscribe from UserLots
                };
            }
            else {
                console.log("User not found");
                onUserDataChange(null); // Notify with null if user doesn't exist
            }
        });

        // Return unsubscribeUserDoc in case "UserLots" doesn't exist or onSnapshot fails
        return unsubscribeUserDoc;
    } catch (error) {
        console.error("Error fetching data: ", error);
        // Return a no-op cleanup function if there is an error
        return () => { };
    }
}

export async function UpdatePayment({ Event_id, Lot_id, Usermail, Amount }) {
    try {
        // Reference to the specific event document in Firestore
        const eventDocRef = doc(
            database,
            `Car_Parks/${Usermail}/UserLots/${Lot_id}/lot_events`,
            Event_id
        );

        // Update the amount field in the specified document
        await updateDoc(eventDocRef, {
            "Amount": Amount,
            "Paid": 1,
            "Real_end_time": new Date(),
        }
        );

        console.log("Payment updated successfully!");
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
}



export async function Add_newevent(Lot_id, User_id, event_data) {

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


export async function Create_user(User_email, User_name, Car_park_name, Car_park_address, Num_car_park_slots) { //only function that rquires backend server
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




const express = require('express');
const cors = require('cors');
const db = require('./API/Firestore');
const bodyParser = require('body-parser');
const {GeoPoint} = require('@google-cloud/firestore');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

const port = 8000;

// Define a route
var user = {};
let Fetch_item;
let response;
let response_array = [];

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get('/test', (req, res) => {
    console.log("Test");
    res.send("Test");
})

app.get('/User/:UserID', async (req, res) => {//currently non-functional
    try {
        //first part of user objact
        Fetch_item = db.collection("Car_Parks").doc(req.params.UserID);
        console.log("Asking for ", req.params.UserID);
        response = await Fetch_item.get();
        user = {
            "User_id": response.id,
            "User_name": response.data().User_name,
            "Car_park_name": response.data().Car_park_name,
            "num_of_lots": response.data().num_of_lots,
            "UserLots": {}
        }

        //second part of user object
        Fetch_item = db.collection("Car_Parks").doc(req.params.UserID).collection("UserLots");
        response = await Fetch_item.get();



        response.forEach(doc => {
            response_array.push(doc.data());
        });


        for (let i = 0; i < response_array.length; i++) {
            user.UserLots[response_array[i].name] = response_array[i];
        }

        for (let i = 0; i < response_array.length; i++) {
            Fetch_item = db.collection("Car_Parks").doc(req.params.UserID).collection("UserLots").doc(response_array[i].name).collection("lot_events");
            response = await Fetch_item.get();
            let newarray = [];
            response.forEach(doc => {
                newarray.push(doc.data());
            });
            // console.log("User::: ", user);
            response_array[i].lot_events = response.docs.map(doc => doc.data());
        }


        res.send(user);
        console.log("Sending data");

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }


});

app.get('/Parklot/:UserID/:lotid', (req, res) => {//currently non-functional
    let Lot_id = req.params.lotid;
    let User_id = req.params.UserID;
    console.log("Asking for ", Lot_id);
    Fetch_item = db.collection("Car_Parks").doc(User_id).collection("UserLots").doc(Lot_id);
    Fetch_item.get().then(doc => {
        if (!doc.exists) {
            console.log("No such document!");
        } else {
            console.log("Document data:", doc.data());
            var sending_park_lot = doc.data();
            res.send(sending_park_lot);
        }
    })

});

app.post('/Add_event/:UserID/:lotid', async (req, res) => { //currently non-functional
    let Lot_id = req.params.lotid;
    let event_data = req.body;
    let now_user_name = req.params.UserID;
    console.log("ADD event to user ", now_user_name, " Lot id ", Lot_id, " with data ", event_data);

    try {
        const response1 = await db.collection("Car_Parks").doc(now_user_name).collection("UserLots").doc(Lot_id).collection("lot_events").add(event_data);


    } catch (error) {


    }


});



//for mobile
// app.post('/AddEvent', async (req, res) => {
//     let event_data = req.body;
//     let now_user_name = event_data.Car_park;
//     console.log("ADD event to Car park ", now_user_name, " with data ", event_data);

//     try {
//         const carParkRef = db.collection("Car_Parks").doc(now_user_name).collection("UserLots");
//         const allLotsSnapshot = await carParkRef.get();

//         const newEventStart = new Date(event_data.start).toISOString();
//         const newEventEnd = new Date(event_data.end).toISOString();

//         let availableSlots = [];
//         let notavailable = [];
//         let Total_Lots = 0;


//         // Iterate through all parking lots in the car park
//         for (let lotDoc of allLotsSnapshot.docs) {
//             Total_Lots++;
//             let Lot_id = lotDoc.id;
//             const eventsRef = carParkRef.doc(Lot_id).collection("lot_events");
//             const existingEventsSnapshot = await eventsRef.get();

//             let isOverlap = false;

//             // Check for overlaps with existing events
//             existingEventsSnapshot.forEach(doc => {

//                 const existingEvent = doc.data();
//                 const existingEventStart = new Date(existingEvent.start).toISOString();
//                 const existingEventEnd = new Date(existingEvent.end).toISOString();



//                 if (
//                     (newEventStart < existingEventEnd && newEventEnd > existingEventStart) ||
//                     (newEventStart >= existingEventStart && newEventStart < existingEventEnd)
//                 ) {
//                     isOverlap = true;
//                 }
//             });

//             // If no overlap, add this parking lot to the available slots array
//             if (!isOverlap) {
//                 availableSlots.push(Lot_id);
//             }
//             else {
//                 notavailable.push(Lot_id);
//             }
//         }

//         if (availableSlots.length === 0) {
//             return res.status(400).json({ error: "No available parking slots for the new event." });
//         }
//         else {
//             console.log("Available slots: ", availableSlots);
//             console.log("Not available slots: ", notavailable);

//         }

//         // // If there are available slots, you can proceed to add the event to one of them
//         // // Example: Add the event to the first available slot

//         try {
//             const response1 = await carParkRef.doc(availableSlots[0]).collection("lot_events").add(event_data);
//             console.log("Added event to: ", availableSlots[0]);
//             return res.status(200).json({
//                 success: "Event added successfully.",
//                 availableSlots: availableSlots
//             });

//         } catch (error) {

//             console.log("Error adding event");
//             return res.status(500).json({
//                 Fail: "Event not added",
//                 availableSlots: availableSlots
//             });


//         }

//     } catch (error) {
//         console.error("Error adding event:", error);
//         return res.status(500).json({ error: "An error occurred while adding the event." });
//     }
// });
async function addEventToHistory(eventData, userMail, eventId) {
    console.warn("Adding event to history", eventData);

    // Reference to the document named after the relevant date
    const docRef = db.collection("Car_Parks").doc(userMail).collection("History").doc(eventData.date);
    console.warn("Adding event to history at", docRef);


    try {
        await docRef.update({
            [eventData]: eventData // Dynamically create the key with its value
        });

        console.log("Event added to history successfully!");
    } catch (error) {
        console.error("Error adding event to history:", error);
    }
}

app.post('/AddEvent', async (req, res) => {
    let event_data = req.body;
    let now_user_name = event_data.Car_park;
    console.log("ADD event to Car park ", now_user_name, " with data ", event_data);

    try {
        const carParkRef = db.collection("Car_Parks").doc(now_user_name).collection("UserLots");
        const allLotsSnapshot = await carParkRef.get();

        const newEventStart = new Date(event_data.start).toISOString();
        const newEventEnd = new Date(event_data.end).toISOString();

        let availableSlots = [];
        let remainingTimes = []; // To store remaining times for each available lot

        // Iterate through all parking lots in the car park
        for (let lotDoc of allLotsSnapshot.docs) {
            let Lot_id = lotDoc.id;
            const eventsRef = carParkRef.doc(Lot_id).collection("lot_events");
            const existingEventsSnapshot = await eventsRef.get();

            let isOverlap = false;
            let occupiedTime = 0;

            // Check for overlaps with existing events
            existingEventsSnapshot.forEach(doc => {
                const existingEvent = doc.data();
                const existingEventStart = new Date(existingEvent.start).toISOString();
                const existingEventEnd = new Date(existingEvent.end).toISOString();

                if (
                    (newEventStart < existingEventEnd && newEventEnd > existingEventStart) ||
                    (newEventStart >= existingEventStart && newEventStart < existingEventEnd)
                ) {
                    isOverlap = true;
                }

                // Calculate total occupied time
                occupiedTime += (new Date(existingEventEnd) - new Date(existingEventStart)) / (1000 * 60 * 60); // Convert ms to hours
            });

            // If no overlap, calculate remaining time
            if (!isOverlap) {
                const totalParkingTime = 24; // Assuming 24 hours as total available time for simplicity
                const newEventDuration = (new Date(newEventEnd) - new Date(newEventStart)) / (1000 * 60 * 60); // Convert ms to hours
                const remainingTime = totalParkingTime - (occupiedTime + newEventDuration);

                availableSlots.push(Lot_id);
                remainingTimes.push({ Lot_id, remainingTime });
            }
        }

        if (availableSlots.length === 0) {
            return res.status(400).json({ error: "No available parking slots for the new event." });
        }

        // Sort available slots by the remaining time in descending order
        remainingTimes.sort((a,b) => b.remainingTime - a.remainingTime);

        // Select the lot with the most remaining time
        const selectedLot = remainingTimes[0].Lot_id;

        // Add the event to the selected lot
        try {
            const response1 = await carParkRef.doc(selectedLot).collection("lot_events").add(event_data);
            console.log("Added event with ID ", response1.id," / ",selectedLot);
            var date = new Date(event_data.start).toDateString();
            console.log("date: ",date);
            let newhistory = {
                "parklot_id":selectedLot,
                "vehicle_number":event_data.Vehicle_number,
                "start":event_data.start,
                "date":date,
                "end":event_data.end,
                "client_name":event_data.title,
                "client_email":event_data.title,
                "vehicle_type":event_data.Vehicle,
                "total_amount":0
            }

            // addEventToHistory(newhistory,event_data.Car_park,response1.id);
            // addEventToHistory(newhistory,event_data.Car_park,"iddd");

            res.send({
                success: "Event added successfully. History added succussfully",})

            
        } catch (error) {
            console.log("Error adding event:", error);
            return res.status(500).json({ error: "Event not added" });
        }
    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({ error: "An error occurred while adding the event." });
    }
});


app.post('/Add_event/:UserID/:lotid', async (req, res) => { // currently non functional
    let Lot_id = req.params.lotid;
    let event_data = req.body;
    let now_user_name = req.params.UserID;
    console.log("ADD event to user ", now_user_name, " Lot id ", Lot_id, " with data ", event_data);

    try {
        const eventsRef = db.collection("Car_Parks").doc(now_user_name).collection("UserLots").doc(Lot_id).collection("lot_events");

        // Fetch existing events
        const existingEvents = await eventsRef.get();

        // Parse the start and end times of the new event from the request body
        const newEventStart = new Date(event_data.start).toISOString();
        const newEventEnd = new Date(event_data.end).toISOString();

        // Check if the new event overlaps with any existing events
        let isOverlap = false;

        existingEvents.forEach(doc => {
            const existingEvent = doc.data();
            const existingEventStart = new Date(existingEvent.start).toISOString();
            const existingEventEnd = new Date(existingEvent.end).toISOString();

            // Check if the new event overlaps with the existing event
            if (
                (newEventStart < existingEventEnd && newEventEnd > existingEventStart) || // New event starts before the existing event ends and ends after the existing event starts
                (newEventStart >= existingEventStart && newEventStart < existingEventEnd) // New event starts during the existing event
            ) {
                isOverlap = true;
            }
        });

        if (isOverlap) {
            return res.status(400).json({ error: "The new event overlaps with an existing event." });
        }

        // If no overlap, add the new event
        const response1 = await eventsRef.add(event_data);

        return res.status(200).json({ success: "Event added successfully." });

    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({ error: "An error occurred while adding the event." });
    }
});


app.post("/Add_User", async (req, res) => {//currently functional
    console.log("User data::: ", req.body);
    let User_email = req.body.User_email;
    let User_name = req.body.User_name;
    let Car_park_name = req.body.Car_park_name;
    let num_of_lots = req.body.Num_car_park_slots;
    let Park_location = req.body.Park_location;
    const [latitude, longitude] = Park_location.split(',').map(Number);

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).send({ error: "Invalid GPS location format." });
    }
    const geoPoint = new GeoPoint(latitude, longitude);

    let stroingobject = {
        "User_name": User_name,
        "Car_park_name": Car_park_name,
        "num_of_lots": num_of_lots,
        "location": geoPoint

    }


    try {
        const res = await db.collection('Car_Parks').doc(User_email).set(stroingobject);

        for (let index = 1; index <= num_of_lots; index++) {
            const response = await db.collection('Car_Parks').doc(User_email).collection("UserLots").doc("Lot_" + index).set({ "name": "Lot_" + index, "lot_events": [] });
            console.log("Created lot: ", "Lot_" + index);

        }
        console.log("User added successfully");


    } catch (error) {

    }

})



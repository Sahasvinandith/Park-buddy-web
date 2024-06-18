const express = require('express');
const cors = require('cors');
const db = require('./API/Firestore');
const bodyParser = require('body-parser');

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

app.get('/User/:UserID', async (req, res) => {
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

app.get('/Parklot/:lotid', (req, res) => {
    let Lot_id = req.params.lotid;
    let sending_park_lot = user.UserLots[Lot_id];
    res.send(sending_park_lot);
});

app.post('/Add_event/:UserID/:lotid', async (req, res) => {
    let Lot_id = req.params.lotid;
    let event_data = req.body;
    let now_user_name = req.params.UserID;
    console.log("ADD event to user ",now_user_name," Lot id ",Lot_id," with data ",event_data);

    try {
        const response1 = await db.collection("Car_Parks").doc(now_user_name).collection("UserLots").doc(Lot_id).collection("lot_events").add(event_data);


    } catch (error) {


    }



});

app.post("/Add_User", async (req, res) => {
    console.log("User data::: ", req.body);
    let User_email=req.body.User_email;
    let User_name = req.body.User_name;
    let Car_park_name = req.body.Car_park_name;
    let num_of_lots = req.body.Num_car_park_slots;
    

    let stroingobject = {
        "User_name": User_name,
        "Car_park_name": Car_park_name,
        "num_of_lots": num_of_lots
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



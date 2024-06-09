const express = require('express');
const cors = require('cors');
const db = require('./API/Firestore');

const app = express();
app.use(express.json());

app.use(cors());

const port = 8000;

// Define a route
app.get('/user/:UserID', async (req, res) => {
    try {
        const User = db.collection("Car_Parks").doc(req.params.UserID);
        console.log("Asking for ",req.params.UserID);
        const response = await User.get();
        console.log(response.data());
        let responsearr = [];
        // response.forEach(element => {

        //     let temparr = { id: element.id, ...element.data() };

        //     //temparr.push({id:element.id,...element.data()})
        //     responsearr.push(temparr);

        // });
        
        res.send(response.data());
        console.log("Sending data");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }


});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
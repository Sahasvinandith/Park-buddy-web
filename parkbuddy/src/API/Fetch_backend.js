import axios from "axios";

let Username="User1@gmail.com";

let User={"User":"Initial user"};

export async function fetchUser() {
    console.log("Fetching user...");
    try {
        const response = await axios.get('http://localhost:8000/User/' + Username);
        
        User=response.data;
        console.log("Response: ",User);
        console.log("Check: ",User.UserLots.Lot_1.lot_events[0].start);
        
        return User;
        

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export async function fetchParklot(lotid) {
    // console.log("Fetching user...");
    try {
        const response = await axios.get('http://localhost:8000/Parklot/'+lotid);
        
        let park_lot=response.data;
        // console.log("Response for park lot: ",park_lot);
        // console.log("Check: ",User.UserLots.Lot_1.lot_events[0].start);
        
        return park_lot;
        

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}



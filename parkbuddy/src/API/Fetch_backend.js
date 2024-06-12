import axios from "axios";

let Username="User1@gmail.com";

let User={"User":"Initial user"};

export async function fetchUser(User_email) {
    console.log("Fetching user...",User_email);
    
    try {
        const response = await axios.get('http://localhost:8000/User/' + User_email);
        
        User=response.data;
        // console.log("Response: ",User);
        // console.log("Check: ",User.UserLots.Lot_1.lot_events[0].start);
        
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
        
        return park_lot;
        

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export async function Add_newevent(Parklot_id,User_id,eventdata) {
    // console.log("Fetching user...");
    try {
        const response = await axios.post('http://localhost:8000/Add_event/'+User_id+'/'+Parklot_id,eventdata);
        
        
    
    }
    catch (error) {
        console.error("Error Sending data: ", error);
    }
}
    
export async function Create_user(User_email,User_name,Car_park_name,Car_park_address,Num_car_park_slots) {
    let User_info={
        User_email:User_email,
        User_name:User_name,
        Car_park_name:Car_park_name,
        Car_park_address:Car_park_address,
        Num_car_park_slots:Num_car_park_slots
    }
    try {
        const response = await axios.post('http://localhost:8000/Add_User',User_info);
        
    } catch (error) {
        
    }

}
        



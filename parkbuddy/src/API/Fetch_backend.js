import axios from "axios";

let User="User1@gmail.com";
export async function fetchUser() {
    try {
        const response = await axios.get('http://localhost:8000/User/' + User);
        console.log("Response: ",response.data); ;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}
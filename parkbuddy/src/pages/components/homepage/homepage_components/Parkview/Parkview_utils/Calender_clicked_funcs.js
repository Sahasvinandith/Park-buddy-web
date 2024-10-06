import { Add_newevent,addEventToHistory } from "../../../../../../API/Fetch_backend";
import {  } from "../../../../../../API/Fetch_backend";
export function Compare_dates (Selcted_date_date){//this page was dedicated to store function that would need in calender methods
    
    
    let now_time=new Date().getTime();
    let Selcted_date=Selcted_date_date.getTime()
    let diff=Selcted_date-now_time;
    console.log("Sel time: ",Selcted_date);
    console.log("Now time: ",now_time);
    if(diff>=0){
        console.log("Future event");
    }else{
        console.log("Diff time: ",diff);
        console.log("Past event");
    }

}

export function Add_event (Parklot_id,User_id,title,start,end,Vehicle,Vehicle_number,Date){ 
    console.log("Enable add event function");

    let newEvent = {
        "title":title,
        "start":start,
        "end":end,
        "Vehicle":Vehicle,
        "Vehicle_number":Vehicle_number
    }

    let newhistory = {
        "parklot_id":Parklot_id,
        "vehicle_number":Vehicle_number,
        "start":start,
        "date":Date,
        "end":end,
        "client_name":title,
        "client_email":"",
        "vehicle_type":Vehicle,
        "total amount":0
    }
    console.warn("Adding event to history11");

    addEventToHistory(newhistory,User_id);

    Add_newevent(Parklot_id,User_id,newEvent);



}

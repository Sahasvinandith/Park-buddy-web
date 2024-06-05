import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import { User } from '../../../../../exampleUser';
import { useState } from 'react';


import React from 'react';
import { type } from '@testing-library/user-event/dist/type';




function Park_slot_info(props){
    const {park_lot_id,changemode}=props;
    const[events,setevents]=useState([]);
    // let park_lot_id="Lot1";
    // setevents(User.UserLots.park_lot_id)
    
    return(
        <div>
            <button onClick={()=>{
                changemode();
            }}>go back</button>
            <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                events= {[
                    {
                      title: 'My Event',
                      start: '2024-06-06T07:30',
                      end:'2024-06-06T10:30',
                      url: 'https://google.com/'
                    }
                    // other events here
                  ]}
                initialView={'timeGridWeek'}
                headerToolbar={{
                    start:"today prev,next",
                    center:"title",
                    end:"dayGridMonth,timeGridWeek,timeGridDay"
                }}
                dateClick={function(info){
                    console.log("You pressed on ",info.date.getHours());
                }}
                selectable={true}
                height={"90vh"}
            />
        </div>
    )
}

export default Park_slot_info;
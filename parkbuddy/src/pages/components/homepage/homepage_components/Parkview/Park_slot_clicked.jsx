import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import { User } from '../../../../../exampleUser';
import { SquareArrowLeft } from 'lucide-react';
import Popup_event from './Event_clicked';
import React, { useState } from 'react';


let current_event={};
function Park_slot_info(props) {
    const { park_lot_id, changemode } = props;
    const [Popup_info,set_pop_up_info]=useState({"hi":"hui"})

    let Cur_User=User;
    var events = Cur_User.UserLots[park_lot_id].lot_events;

    const[event_popup_show,change_event_popup]=useState(false);
    

    return (
        <div className='w-full  h-[calc(100vh-100px)] flex flex-col'>

        

            <div className=' w-full  h-[calc(100vh-100px)] flex flex-col px-2 justify-between'>
                <div className='flex flex-row w-full justify-between'>
                    <div className='flex-1'>
                        <button className=' bg-slate-600 text-yellow-200 px-3 py-2 mb-2 w-max h-max flex flex-row rounded-lg gap-2 items-center hover:bg-slate-700 ' onClick={() => { changemode(); }} >
                            <SquareArrowLeft size={'30px'} />
                            Go back
                        </button>
                    </div>
                    
                    <div className='ml-20 text-2xl font-serif font-bold w-96 text-center flex-1'>{park_lot_id}</div>
                    <div className='flex-1'></div>

                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    events={events}
                    initialView={'timeGridWeek'}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    eventClick= {function(info) {
                        info.jsEvent.preventDefault();
                        console.log(info.event.toJSON());
                        change_event_popup(true);
                        current_event={
                            "Parking_lot":park_lot_id,
                            "Driver_name":info.event.title,
                            "Vehicle":info.event.toJSON().extendedProps.Vehicle,
                            "Start_time":info.event.start,
                            
                            "End_time":info.event.end,
                            "Vehicle_number":info.event.toJSON().extendedProps.Vehicle_number,
                            
                        }
                        
                        set_pop_up_info(current_event);
                        
                        // alert('Event: ' + info.event.title);
                        // alert('Start time: ' + info.event.start.getHours());
                    
                        // // change the border color just for fun
                        // info.el.style.borderColor = 'red';
                    }}
                    
                    dateClick={function (info) {
                        console.log("You pressed on ", info.date.toISOString());
                    }}
                    selectable={true}
                    height={"90vh"}
                />
            </div>
            {event_popup_show?<Popup_event Close={()=>change_event_popup(false)} Info={Popup_info}/>:""}
            
        </div>
    )
}

export default Park_slot_info;
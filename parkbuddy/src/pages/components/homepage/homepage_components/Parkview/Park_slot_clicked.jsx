import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

import { SquareArrowLeft } from 'lucide-react';
import Popup_event from './Event_clicked';
import Create_event from './Date_clicked';
import { Compare_dates } from './Parkview_utils/Calender_clicked_funcs';
import React, { useEffect, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Add_car_popup from './AddCar';
import { fetchParklot } from '../../../../../API/Fetch_backend';






let current_event = {};

function Park_slot_info(props) {



    const { park_lot_id,User_id, changemode } = props;

    const [events, setevents] = useState([]);

    useEffect(() => {
        async function main() {
            let temp_Park_Lot;
            await fetchParklot(park_lot_id).then((data) => {
                temp_Park_Lot = data;
                
                setevents(temp_Park_Lot.lot_events);
                
            });
        }
        main();
    }, [])






    const [Popup_info, set_pop_up_info] = useState({ "hi": "hui" })



    // var events = Cur_User.UserLots[park_lot_id].lot_events;

    const [event_popup_show, change_event_popup] = useState(false);
    const [Add_car_popup_show, change_addcar_popup_event] = useState(false);


    return (
        <div className='w-full  h-[calc(100vh-100px)] flex flex-col'>



            <div className=' w-full  h-[calc(100vh-100px)] flex flex-col px-2 justify-between'>
                <div className='flex flex-row w-full justify-between'>
                    <div className='flex-1 flex flex-row gap-5'>
                        <button className=' bg-slate-600 text-yellow-200 px-3 py-2 mb-2 w-max h-max flex flex-row rounded-lg gap-2 items-center hover:bg-slate-700 ' onClick={() => { changemode(); }} >
                            <SquareArrowLeft size={'30px'} />
                            Go back
                        </button>
                        <button className=' bg-green-700 font-bold text-yellow-300 px-3 py-2 mb-2 w-max h-max flex flex-row rounded-xl shadow-md gap-2 items-center hover:text-xl' onClick={() => { change_addcar_popup_event(true) }} >Add Park <CirclePlus size={"30px"} /></button>
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
                    eventClick={function (info) {
                        info.jsEvent.preventDefault();
                        console.log(info.event.toJSON());
                        change_event_popup(true);
                        current_event = {
                            "Parking_lot": park_lot_id,
                            "Driver_name": info.event.title,
                            "Vehicle": info.event.toJSON().extendedProps.Vehicle,
                            "Start_time": info.event.start,

                            "End_time": info.event.end,
                            "Vehicle_number": info.event.toJSON().extendedProps.Vehicle_number,

                        }

                        set_pop_up_info(current_event);

                    }}

                    dateClick={function (info) {
                        Compare_dates(info.date);


                    }}
                    selectable={true}
                    height={"90vh"}
                />
            </div>
            {event_popup_show ? <Popup_event Close={() => change_event_popup(false)} Info={Popup_info} /> : ""}
            {Add_car_popup_show ? <Add_car_popup Close={() => change_addcar_popup_event(false)} Park_lot_id={park_lot_id} User_id={User_id} Info={Popup_info} /> : ""}

        </div>
    )
}

export default Park_slot_info;
export function HistoryCard(props) {
    const { eventdata } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Convert the string into a Date object
        return date.toLocaleString('en-US', {
            weekday: 'long', // Show full name of the day (e.g., "Monday")
            year: 'numeric',
            month: 'long',  // Show full month name (e.g., "October")
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use 12-hour format with AM/PM
        });
    };


    //format of eventdata = { vehicle_number, start, end, client_name, client_email, vehicle_type, total_amount }
    return (
        // <div className="flex flex-col text-lg m-2 px-3 py-2 border-black border-2 rounded-lg w-calc[100%-10px] h-max">
        //     <div className="block w-full font-semibold text-xl">
        //         {eventdata.vehicle_number}
        //     </div>
        //     <div className="flex flex-row w-full">
        //         <div className="flex-1">Client name: {eventdata.client_name}</div>
        //         <div className="flex-1">Arrival time: {formatDate(eventdata.start)}</div>
        //         {/* billing maybe */}
        //         <div className="flex-1"></div>


        //     </div>
        //     <div className="flex flex-row w-full">
        //         <div className="flex-1">Vehicle type: {eventdata.vehicle_type}</div>
        //         <div className="flex-1">Departure time: {formatDate(eventdata.end)}</div>
        //         <div className="flex-1 text-xl font-bold">Balance: </div>
        //     </div>


        // </div>
    


            <div className=" text-lg m-2 px-3 py-2 border-black border-2 rounded-lg w-calc[100%-10px] h-max">
                <div className="text-xl font-bold">{eventdata.vehicle_number}</div><hr />
                <div className="flex flex-row">
                    <div style={{ display: "flex", flex: 3 }} className="flex-row">
                        <div style={{ display: "flex", flex: 1 }} className="flex-col">
                            <div className="flex-1">Client name: {eventdata.client_name}</div>
                            <div className="flex-1">Vehicle type: {eventdata.vehicle_type}</div>

                        </div>
                        <div style={{ display: "flex", flex: 2 }} className="flex-col">
                            <div className="flex-1">Arrival time: {formatDate(eventdata.start)}</div>
                            <div className="flex-1">Departure time: {formatDate(eventdata.end)}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flex: 1 }} className=" flex-col">
                        <div className="flex-1 text-xl font-bold">Balance:Rs {eventdata.total_amount}</div>
                    </div>
                </div>
            </div>
        
    )
}
